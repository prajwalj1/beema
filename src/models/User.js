import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your full name."],
    },
    email: {
      type: String,
      required: [true, "Please provide an email address."],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
    },
    password: {
      type: String,
      required: [true, "Please provide a password."],
      minlength: [6, "Password must be at least 6 characters."],
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number."],
    },
    dob: {
      type: Date,
      required: [true, "Please provide your Date of Birth."],
    },
    gender: {
      type: String,
      required: [true, "Please select a gender."],
      enum: ["male", "female", "other"],
    },
    citizenshipNumber: {
      type: String,
      required: [true, "Please provide your Citizenship Number."],
    },
    address: {
      type: String,
      required: [true, "Please provide your current address."],
    },
    role: {
      type: String,
      required: true,
      enum: ["customer", "promoter", "admin"],
      default: "customer",
    },
    promoterId: {
      type: String,
      required: false, // Optional, only applicable to promoters
    },
    referredBy: {
      type: String, // ID of the promoter who referred this customer
      required: false,
    },
    customerCode: {
      type: String, // Unique customer code (e.g. C0000089)
      required: false,
    },
    image: {
      type: String,
      required: false, // Base64 string
    },
    resetPasswordToken: {
      type: String,
      required: false,
    },
    resetPasswordExpires: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

// Force model recompilation to register updated schema enum options in development
if (mongoose.models && mongoose.models.User) {
  delete mongoose.models.User;
}

export default mongoose.model("User", UserSchema);
