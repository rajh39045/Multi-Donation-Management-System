import Donation from "../models/Donation.js";
import Certificate from "../models/Certificate.js";
import { v4 as uuidv4 } from "uuid";

/* =======================================================
   CREATE DONATION
======================================================= */
export const createDonation = async (req, res) => {
  try {
    const { type, amount, quantity, location } = req.body;

    const donation = await Donation.create({
      donor: req.user.id,
      type,
      amount,
      quantity,
      location
    });

    res.status(201).json(donation);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* =======================================================
   GET MY DONATIONS (DONOR)
======================================================= */
export const getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({
      donor: req.user.id
    }).sort({ createdAt: -1 });

    res.json(donations);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* =======================================================
   GET ALL DONATIONS (ADMIN)
======================================================= */
export const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate("donor", "name email role")
      .sort({ createdAt: -1 });

    res.json(donations);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* =======================================================
   UPDATE DONATION STATUS (ADMIN)
======================================================= */
export const updateDonationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Update status and return updated document
    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: "after" } // modern mongoose option
    );

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    // ==============================
    // CERTIFICATE ELIGIBILITY LOGIC
    // ==============================
    if (status === "COMPLETED") {

      const completedDonations = await Donation.find({
        donor: donation.donor,
        status: "COMPLETED"
      });

      const totalAmount = completedDonations.reduce(
        (sum, d) => sum + (d.amount || 0),
        0
      );

      const donationCount = completedDonations.length;

      // Eligibility condition
      if (donationCount >= 5 || totalAmount >= 5000) {

        const existingCert = await Certificate.findOne({
          user: donation.donor,
          type: "DONOR"
        });

        if (!existingCert) {
          await Certificate.create({
            user: donation.donor,
            type: "DONOR",
            totalDonations: totalAmount,
            certificateId: uuidv4()
          });
        }
      }
    }

    res.json({
      message: "Donation status updated successfully",
      donation
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};