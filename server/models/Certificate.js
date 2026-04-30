import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    type: {
      type: String,
      enum: ["DONOR", "VOLUNTEER"],
      required: true
    },
    totalDonations: {
      type: Number,
      default: 0
    },
    certificateId: {
      type: String,
      unique: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Certificate", certificateSchema);