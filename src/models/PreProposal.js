import mongoose from "mongoose";

const PreProposalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // Optional for guest users, but linked if logged in
    },
    // Policy Details
    planName: {
      type: String,
      required: [true, "Policy Plan is required"],
      default: "whole life plan",
    },
    sumAssured: {
      type: Number,
      required: [true, "Sum Assured is required"],
      min: [50000, "Minimum Sum Assured is Rs. 50,000"],
    },
    policyTerm: {
      type: Number,
      required: [true, "Policy Term is required"],
      min: [5, "Minimum Policy Term is 5 years"],
      max: [50, "Maximum Policy Term is 50 years"],
    },
    premiumMode: {
      type: String,
      required: [true, "Premium Paying Mode is required"],
      enum: ["yearly", "half-yearly", "quarterly", "monthly"],
    },
    // Personal Info
    fullName: {
      type: String,
      required: [true, "Full name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    dob: {
      type: Date,
      required: [true, "Date of Birth is required"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["male", "female", "other"],
    },
    maritalStatus: {
      type: String,
      required: [true, "Marital Status is required"],
      enum: ["single", "married", "divorced", "widowed"],
    },
    education: {
      type: String,
      required: [true, "Education Qualification is required"],
    },
    nationality: {
      type: String,
      required: [true, "Nationality is required"],
      default: "Nepalese",
    },
    // Identity Documents
    personalPhoto: {
      type: String,
      required: [true, "Personal Photo is required"], // Base64
    },
    identityDocType: {
      type: String,
      required: [true, "Identity Document Type is required"],
      enum: ["citizenship", "passport", "license", "voter_id"],
    },
    identityDocNo: {
      type: String,
      required: [true, "Identity Document Number is required"],
    },
    identityDocFront: {
      type: String,
      required: [true, "Front Photo of Identity Document is required"], // Base64
    },
    identityDocBack: {
      type: String,
      required: [true, "Back Photo of Identity Document is required"], // Base64
    },
    identityDocIssuedDate: {
      type: Date,
      required: [true, "Issued Date is required"],
    },
    identityDocIssuedPlace: {
      type: String,
      required: [true, "Issued Place is required"],
    },
    // Family Info
    fatherName: {
      type: String,
      required: [true, "Father's name is required"],
    },
    motherName: {
      type: String,
      required: [true, "Mother's name is required"],
    },
    grandfatherName: {
      type: String,
      required: [true, "Grandfather's name is required"],
    },
    spouseName: {
      type: String,
      required: false,
    },
    // Permanent Address
    permState: {
      type: String,
      required: [true, "Permanent State is required"],
    },
    permDistrict: {
      type: String,
      required: [true, "Permanent District is required"],
    },
    permMunicipality: {
      type: String,
      required: [true, "Permanent Municipality/VDC is required"],
    },
    permWard: {
      type: String,
      required: [true, "Permanent Ward is required"],
    },
    permStreet: {
      type: String,
      required: [true, "Permanent Street/Tole is required"],
    },
    // Temporary Address
    tempState: {
      type: String,
      required: [true, "Temporary State is required"],
    },
    tempDistrict: {
      type: String,
      required: [true, "Temporary District is required"],
    },
    tempMunicipality: {
      type: String,
      required: [true, "Temporary Municipality/VDC is required"],
    },
    tempWard: {
      type: String,
      required: [true, "Temporary Ward is required"],
    },
    tempStreet: {
      type: String,
      required: [true, "Temporary Street/Tole is required"],
    },
    isSameAddress: {
      type: Boolean,
      default: false,
    },
    // Medical & Lifestyle
    height: {
      type: Number, // in cm
      required: [true, "Height is required"],
    },
    weight: {
      type: Number, // in kg
      required: [true, "Weight is required"],
    },
    tobaccoUse: {
      type: Boolean,
      required: [true, "Tobacco use specification is required"],
      default: false,
    },
    medicalConditions: {
      type: String,
      default: "None",
    },
    // Nominee Info
    nomineeName: {
      type: String,
      required: [true, "Nominee Name is required"],
    },
    nomineeRelation: {
      type: String,
      required: [true, "Nominee Relation is required"],
    },
    nomineePhone: {
      type: String,
      required: [true, "Nominee Phone is required"],
    },
    nomineeIdType: {
      type: String,
      required: [true, "Nominee ID Document Type is required"],
    },
    nomineeIdNo: {
      type: String,
      required: [true, "Nominee ID Document Number is required"],
    },
    nomineeIdIssuedDate: {
      type: Date,
      required: [true, "Nominee ID Document Issued Date is required"],
    },
    nomineeIdIssuedPlace: {
      type: String,
      required: [true, "Nominee ID Document Issued Place is required"],
    },
    nomineePhoto: {
      type: String,
      required: [true, "Nominee Photo is required"], // Base64
    },
    nomineeIdFront: {
      type: String,
      required: [true, "Nominee Front Photo of Document is required"], // Base64
    },
    nomineeIdBack: {
      type: String,
      required: [true, "Nominee Back Photo of Document is required"], // Base64
    },
    // Status
    status: {
      type: String,
      enum: ["pending", "reviewed", "approved", "rejected"],
      default: "pending",
    }
  },
  { timestamps: true }
);

export default mongoose.models.PreProposal || mongoose.model("PreProposal", PreProposalSchema);
