import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { 
      role, 
      name, 
      email, 
      password, 
      phone, 
      dob, 
      gender, 
      citizenshipNumber, 
      address, 
      promoterId 
    } = body;

    // Validate essential inputs
    if (!name || !email || !password || !phone || !dob || !gender || !citizenshipNumber || !address) {
      return NextResponse.json(
        { error: "Missing required registration fields." },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if the user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists." },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate dynamic promoterId or customerCode
    let generatedPromoterId = undefined;
    let generatedCustomerCode = undefined;
    const generateRandomCode = () => {
      return Math.floor(1000000 + Math.random() * 9000000).toString();
    };

    if (role === "promoter") {
      generatedPromoterId = "P" + generateRandomCode();
    } else {
      generatedCustomerCode = "C" + generateRandomCode();
    }

    // Create a new user
    const newUser = await User.create({
      role,
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
      dob: new Date(dob),
      gender,
      citizenshipNumber,
      address,
      promoterId: generatedPromoterId,
      customerCode: generatedCustomerCode,
      referredBy: role === "customer" ? promoterId : undefined
    });

    return NextResponse.json(
      { message: "User registered successfully!", userId: newUser._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration API error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong on the server." },
      { status: 500 }
    );
  }
}
