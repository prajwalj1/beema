import mongoose from "mongoose";

const PolicySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    preProposalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PreProposal",
    },
    policyNumber: {
      type: String,
      unique: true,
      required: true,
    },
    planName: {
      type: String,
      required: true,
      default: "Dream Policy - Life Insurance",
    },
    provider: {
      type: String,
      required: true,
      default: "Beema Dukaan",
    },
    sumAssured: {
      type: Number,
      required: true,
    },
    premium: {
      type: Number,
      required: true,
    },
    premiumMode: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Pending", "Expired"],
      default: "Active",
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Policy || mongoose.model("Policy", PolicySchema);
