import express from "express";
import {
  createDonation,
  getMyDonations,
  getAllDonations,
  updateDonationStatus
} from "../controllers/donationController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createDonation);
router.get("/my", protect, getMyDonations);
router.get("/", protect, getAllDonations);
router.get("/all", protect, adminOnly, getAllDonations);
router.put("/:id", protect, adminOnly, updateDonationStatus);

export default router;