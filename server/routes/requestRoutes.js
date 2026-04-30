import express from "express";
import {
  createRequest,
  getRequestsForDonor,
  approveRequest
} from "../controllers/requestController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createRequest);
router.get("/", protect, getRequestsForDonor);
router.patch("/:id/approve", protect, approveRequest);

export default router;