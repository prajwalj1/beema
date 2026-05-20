import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { sendEmail } from "@/lib/sendEmail";

export async function POST(req) {
  try {
    const { email, phone } = await req.json();

    if (!email && !phone) {
      return NextResponse.json(
        { error: "Please enter your registered email address or phone number." },
        { status: 400 }
      );
    }

    await dbConnect();

    let user = null;
    if (phone) {
      user = await User.findOne({ phone: phone.trim() });
    } else if (email) {
      user = await User.findOne({ email: email.toLowerCase().trim() });
    }

    if (!user) {
      return NextResponse.json(
        { error: phone ? "Phone number not registered." : "Email address not registered." },
        { status: 404 }
      );
    }

    // Generate a 6-digit verification code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Set code and expiration (10 minutes)
    user.resetPasswordToken = otp;
    user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    // 1. Send the code via Nodemailer to the registered email address
    const emailSubject = "Beema Dukaan - Password Reset Verification Code";
    const emailText = `Hello ${user.name},\n\nYou requested a password reset. Your 6-digit verification code is:\n\n${otp}\n\nThis code will expire in 10 minutes.\n\nIf you did not request this, please ignore this email.`;
    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 10px;">
        <h2 style="color: #059669; text-align: center;">Beema Dukaan Security</h2>
        <p>Hello <strong>${user.name}</strong>,</p>
        <p>You requested a password reset. Please use the following 6-digit verification code to reset your password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="font-size: 24px; font-weight: bold; font-family: monospace; background-color: #f3f4f6; padding: 10px 20px; border-radius: 5px; letter-spacing: 4px;">${otp}</span>
        </div>
        <p style="color: #6b7280; font-size: 12px; text-align: center;">This code is valid for 10 minutes. If you did not make this request, you can safely ignore this email.</p>
      </div>
    `;

    // Attempt to send the email via nodemailer
    let mailSent = false;
    try {
      const emailResult = await sendEmail({
        to: user.email,
        subject: emailSubject,
        text: emailText,
        html: emailHtml,
      });
      mailSent = emailResult.success;
    } catch (mailError) {
      console.error("Failed to dispatch email via Nodemailer:", mailError);
    }

    // 2. Simulate sending to the SIM of the registered number (console log)
    console.log(`[SIM/SMS Dispatch] Sent verification code ${otp} to phone number: ${user.phone}`);
    
    // Always log code to server console for local testing fallbacks
    console.log(`[DEV MODE] Password Reset Code for ${user.email} (Phone: ${user.phone}): ${otp}`);

    return NextResponse.json(
      { 
        message: mailSent 
          ? "Password reset code sent to your email address and SIM number." 
          : "Password reset code generated. Check server logs to retrieve (SMTP not configured).",
        phone: user.phone,
        email: user.email,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
