import mongoose from "mongoose";

const ClaimSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    policyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Policy",
      required: true,
    },
    policyNumber: {
      type: String,
      required: true,
    },
    claimNumber: {
      type: String,
      required: true,
      unique: true,
    },
    planName: {
      type: String,
      required: true,
    },
    claimType: {
      type: String,
      required: true,
      enum: ["Medical/Health", "Accident/Injury", "Critical Illness", "Disability", "Life Benefit", "Other"],
    },
    claimAmount: {
      type: Number,
      required: true,
    },
    incidentDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    supportingDocs: [
      {
        fileName: { type: String, required: true },
        fileData: { type: String, required: true }, // Base64 data URI
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    remarks: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Claim || mongoose.model("Claim", ClaimSchema);
