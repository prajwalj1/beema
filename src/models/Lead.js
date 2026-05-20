import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    promoterUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    fullName: {
      type: String,
      required: true
    },
    email: String,
    phone: {
      type: String,
      required: true
    },
    preferredPlan: {
      type: String,
      default: "Dream Policy - Life Insurance"
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "Proposal Submitted", "Converted"],
      default: "New"
    },
    notes: String
  },
  { timestamps: true }
);

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
