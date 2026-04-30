import Donation from '../models/Donation.js';
import User from '../models/User.js';

const calculateLevel = (total) => {
  if (total >= 25) return 'Diamond';
  if (total >= 15) return 'Gold';
  if (total >= 10) return 'Silver';
  return 'Bronze';
};

export const createDonation = async (req, res) => {
  try {
    const { category, quantity, details } = req.body;

    const donation = new Donation({
      donorId: req.userId, // ✅ correct
      category,
      quantity,
      details: details || { text: "Default donation" }, // ✅ FIXED
      status: "pending",
      requests: [],
    });

    await donation.save();

    res.status(201).json({
      message: "Donation created successfully",
      donation,
    });

  } catch (err) {
    console.error("CREATE ERROR:", err); // 🔥 IMPORTANT
    res.status(500).json({ message: err.message });
  }
};

export const getAllDonations = async (req, res) => {
  try {
    const { status } = req.query;
    const user = req.user;
    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (user.role === 'donor') {
      filter.donorId = user._id;
    } else if (user.role === 'organization') {
      // organization sees donations where they requested or are assigned
      if (!status || status === 'pending' || status === 'requested') {
        filter.$or = [
          { status: 'pending' },
          { requests: user._id },
          { assignedOrganization: user._id },
        ];
      } else {
        filter.$or = [
          { requests: user._id },
          { assignedOrganization: user._id },
        ];
      }
    } else if (user.role === 'volunteer') {
      if (status === 'accepted') {
        filter.status = 'accepted';
        filter.assignedVolunteer = { $exists: false };
      } else {
        // in-progress or completed for assigned volunteer
        filter.assignedVolunteer = user._id;
      }
    }

    const donations = await Donation.find(filter)
      .populate('donorId', 'name email')
      .populate('assignedOrganization', 'name email')
      .populate('assignedVolunteer', 'name email')
      .populate('requests', 'name email')
      .sort({ createdAt: -1 });

    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const requestDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const organizationId = req.userId; // From auth middleware

    // Check if user is organization
    const user = await User.findById(organizationId);
    if (!user || user.role !== 'organization') {
      return res.status(403).json({ message: 'Only organizations can request donations' });
    }

    // Find donation
    const donation = await Donation.findById(id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    if (['accepted', 'in-progress', 'completed'].includes(donation.status)) {
      return res.status(400).json({ message: 'Cannot request donation at this stage' });
    }

    // Check if organization already requested
    if (donation.requests.map((r) => r.toString()).includes(organizationId)) {
      return res.status(400).json({ message: 'Organization already requested this donation' });
    }

    // Add organization to requests
    donation.requests.push(organizationId);
    if (donation.status === 'pending') {
      donation.status = 'requested';
    }
    await donation.save();

    const populated = await Donation.findById(id)
      .populate('donorId', 'name email')
      .populate('assignedOrganization', 'name email')
      .populate('assignedVolunteer', 'name email')
      .populate('requests', 'name email');

    res.json({ message: 'Request sent successfully', donation: populated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const acceptRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { organizationId } = req.body;
    const user = req.user;

    if (!organizationId) {
      return res.status(400).json({ message: 'organizationId is required' });
    }

    // Find donation
    const donation = await Donation.findById(id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    // Only donor or admin can mark as accepted
    const isDonor = donation.donorId.toString() === user._id.toString();
    const isAdmin = user.role === 'admin';
    if (!isDonor && !isAdmin) {
      return res.status(403).json({ message: 'Only donor or admin can accept requests' });
    }

    // Check if organization has requested this donation
    if (!donation.requests.map((r) => r.toString()).includes(organizationId)) {
      return res.status(400).json({ message: 'Organization did not request this donation' });
    }

    // Update donation
    donation.assignedOrganization = organizationId;
    donation.status = 'accepted';
    await donation.save();

    const updatedDonation = await Donation.findById(id)
      .populate('donorId', 'name email')
      .populate('assignedOrganization', 'name email')
      .populate('assignedVolunteer', 'name email')
      .populate('requests', 'name email');

    res.json({ message: 'Request accepted successfully', donation: updatedDonation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const contributeDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const volunteerId = req.userId; // From auth middleware

    // Check if user is volunteer
    const user = await User.findById(volunteerId);
    if (user.role !== 'volunteer') {
      return res.status(403).json({ message: 'Only volunteers can contribute donations' });
    }

    // Find donation
    const donation = await Donation.findById(id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    // Check if donation status is accepted
    if (donation.status !== 'accepted') {
      return res.status(400).json({ message: 'Donation must be accepted before volunteering' });
    }

    // Prevent double volunteer assignment
    if (donation.assignedVolunteer) {
      return res.status(400).json({ message: 'Donation already has a volunteer assigned' });
    }

    // Assign volunteer and update status
    donation.assignedVolunteer = volunteerId;
    donation.status = 'in-progress';
    await donation.save();

    const updatedDonation = await Donation.findById(id)
      .populate('donorId', 'name email')
      .populate('assignedOrganization', 'name email')
      .populate('assignedVolunteer', 'name email')
      .populate('requests', 'name email');

    res.json({ message: 'Contribution started successfully', donation: updatedDonation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const completeDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const organizationId = req.userId; // From auth middleware

    // Check if user is organization / volunteer / admin
    const user = await User.findById(organizationId);
    if (!user) {
      return res.status(403).json({ message: 'User not found' });
    }

    // Find donation
    const donation = await Donation.findById(id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    // Check if donation status is in-progress
    if (donation.status !== 'in-progress') {
      return res.status(400).json({ message: 'Donation must be in-progress to complete' });
    }

    const isAssignedOrg = donation.assignedOrganization?.toString() === user._id.toString();
    const isAssignedVol = donation.assignedVolunteer?.toString() === user._id.toString();

    if (!(user.role === 'admin' || (user.role === 'organization' && isAssignedOrg) || (user.role === 'volunteer' && isAssignedVol))) {
      return res.status(403).json({ message: 'Only assigned organization/volunteer/admin can complete this donation' });
    }

    donation.status = 'completed';
    await donation.save();

    // Update user counts and levels
    const donor = await User.findById(donation.donorId);
    if (donor) {
      donor.donationCount += 1;
      donor.level = calculateLevel(donor.donationCount);
      donor.totalContributions = donor.donationCount;
      await donor.save();
    }

    if (donation.assignedVolunteer) {
      const volunteer = await User.findById(donation.assignedVolunteer);
      if (volunteer) {
        volunteer.contributionCount += 1;
        volunteer.level = calculateLevel(volunteer.contributionCount);
        volunteer.totalContributions = volunteer.contributionCount;
        await volunteer.save();
      }
    }

    // Populate and return updated donation
    await donation.populate('donorId', 'name email');
    await donation.populate('assignedOrganization', 'name email');
    await donation.populate('assignedVolunteer', 'name email');
    await donation.populate('requests', 'name email');

    res.json({ message: 'Donation completed successfully', donation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};