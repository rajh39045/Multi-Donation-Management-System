import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    type: {
      type: String,
      enum: ["FOOD", "MONEY", "CLOTHES"],
      required: true
    },
    amount: {
      type: Number
    },
    quantity: {
      type: Number
    },
    location: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["PENDING", "MATCHED", "COMPLETED"],
      default: "PENDING"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Donation", donationSchema);