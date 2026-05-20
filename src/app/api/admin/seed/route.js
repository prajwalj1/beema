import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await dbConnect();

    // Check if an admin account already exists
    const adminEmail = "admin@beemadukaan.com";
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      // If it exists, make sure the role is set to 'admin'
      if (existingAdmin.role !== "admin") {
        existingAdmin.role = "admin";
        await existingAdmin.save();
        return NextResponse.json({ message: "Updated existing account to admin role.", email: adminEmail });
      }
      return NextResponse.json({ message: "Admin account already exists.", email: adminEmail });
    }

    // Create a default admin account
    const hashedPassword = await bcrypt.hash("Admin@123", 12);
    const newAdmin = await User.create({
      name: "Beema Dukaan Executive",
      email: adminEmail,
      password: hashedPassword,
      phone: "+9779800000000",
      dob: new Date("1990-01-01"),
      gender: "male",
      citizenshipNumber: "00-00-00-00000",
      address: "Kathmandu, Nepal",
      role: "admin"
    });

    return NextResponse.json({
      message: "Admin account seeded successfully!",
      credentials: {
        email: adminEmail,
        password: "Admin@123",
        role: "admin"
      }
    });
  } catch (error) {
    console.error("Seed admin error:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred during seeding." },
      { status: 500 }
    );
  }
}
