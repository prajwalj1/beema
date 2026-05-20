import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/dbConnect";
import Claim from "@/models/Claim";
import Policy from "@/models/Policy";
import User from "@/models/User";

// GET user's submitted claims
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

    const claims = await Claim.find({ userId: user._id }).sort({ createdAt: -1 });

    return NextResponse.json(claims);
  } catch (error) {
    console.error("GET Claims error:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred on the server." },
      { status: 500 }
    );
  }
}

// POST new claim submission
export async function POST(req) {
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

    const body = await req.json();
    const { policyId, claimType, claimAmount, incidentDate, description, supportingDocs } = body;

    if (!policyId || !claimType || !claimAmount || !incidentDate || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Verify policy exists and belongs to the user
    const policy = await Policy.findOne({ _id: policyId, userId: user._id });
    if (!policy) {
      return NextResponse.json({ error: "Associated policy not found or access denied" }, { status: 404 });
    }

    // Generate unique claim number
    let claimNumber = "";
    let isUnique = false;
    let attempts = 0;
    while (!isUnique && attempts < 5) {
      const rand = Math.floor(100000 + Math.random() * 900000);
      claimNumber = `BD-CLAIM-${rand}`;
      const existing = await Claim.findOne({ claimNumber });
      if (!existing) {
        isUnique = true;
      }
      attempts++;
    }

    if (!isUnique) {
      claimNumber = `BD-CLAIM-${Date.now()}`;
    }

    const newClaim = new Claim({
      userId: user._id,
      policyId: policy._id,
      policyNumber: policy.policyNumber,
      claimNumber,
      planName: policy.planName,
      claimType,
      claimAmount: Number(claimAmount),
      incidentDate: new Date(incidentDate),
      description,
      supportingDocs: supportingDocs || [],
      status: "Pending",
    });

    await newClaim.save();

    return NextResponse.json(newClaim, { status: 201 });
  } catch (error) {
    console.error("POST Claims error:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred on the server." },
      { status: 500 }
    );
  }
}
