import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Toggle role
    const newRole = user.role === "customer" ? "promoter" : "customer";
    user.role = newRole;

    // Generate promoterId if they switch to promoter and don't have one
    if (newRole === "promoter" && !user.promoterId) {
      user.promoterId = `PRM-${Math.floor(100000 + Math.random() * 900000)}`;
    }

    await user.save();

    return NextResponse.json({ 
      message: `Switched role to ${newRole}`, 
      role: newRole,
      promoterId: user.promoterId
    }, { status: 200 });
  } catch (error) {
    console.error("Switch Role error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
