import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/dbConnect";
import Policy from "@/models/Policy";
import User from "@/models/User";

export async function GET(req) {
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

    const policies = await Policy.find({ userId: user._id }).sort({ createdAt: -1 });

    return NextResponse.json(policies);
  } catch (error) {
    console.error("GET Policies error:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred on the server." },
      { status: 500 }
    );
  }
}
