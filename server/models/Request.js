import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({

  donation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Donation",
    required: true
  },

  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
    default: "PENDING"
  }

}, { timestamps: true });

export default mongoose.model("Request", requestSchema);