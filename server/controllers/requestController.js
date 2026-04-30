import Request from "../models/Request.js";
import Donation from "../models/Donation.js";

// Create Request
export const createRequest = async (req, res) => {
  try {

    const { donationId } = req.body;

    const request = await Request.create({
      donation: donationId,
      requestedBy: req.user.id
    });

    res.status(201).json(request);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get requests for donor
export const getRequestsForDonor = async (req, res) => {
  try {

    const requests = await Request.find()
      .populate("donation")
      .populate("requestedBy", "name email");

    res.json(requests);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve request
export const approveRequest = async (req, res) => {
  try {

    const request = await Request.findById(req.params.id);

    request.status = "APPROVED";
    await request.save();

    // Update donation status
    await Donation.findByIdAndUpdate(request.donation, {
      status: "COMPLETED"
    });

    res.json({ message: "Request approved" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};