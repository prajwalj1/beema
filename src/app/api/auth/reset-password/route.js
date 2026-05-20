import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, phone, otp, newPassword } = await req.json();

    if ((!email && !phone) || !otp || !newPassword) {
      return NextResponse.json(
        { error: "All fields (identifier, verification code, and new password) are required." },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters." },
        { status: 400 }
      );
    }

    await dbConnect();

    // Find the user with matching email/phone, OTP, and unexpired token
    let user = null;
    if (phone) {
      user = await User.findOne({
        phone: phone.trim(),
        resetPasswordToken: otp,
        resetPasswordExpires: { $gt: new Date() },
      });
    } else if (email) {
      user = await User.findOne({
        email: email.toLowerCase().trim(),
        resetPasswordToken: otp,
        resetPasswordExpires: { $gt: new Date() },
      });
    }

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired verification code." },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update password and clear reset fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return NextResponse.json(
      { message: "Password has been successfully reset. You can now log in." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
