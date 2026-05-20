import mongoose from "mongoose";

const PayoutRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    promoterId: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    payoutMethod: {
      type: String,
      enum: ["eSewa", "Bank Transfer"],
      required: true
    },
    details: {
      accountNumber: String,
      accountName: String,
      bankName: String,
      esewaId: String
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

export default mongoose.models.PayoutRequest || mongoose.model("PayoutRequest", PayoutRequestSchema);
