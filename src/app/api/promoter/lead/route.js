import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Lead from "@/models/Lead";

export const dynamic = "force-dynamic";

// GET leads list for current promoter
export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "promoter") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const promoter = await User.findOne({ email: session.user.email });
    if (!promoter) {
      return NextResponse.json({ error: "Promoter profile not found" }, { status: 404 });
    }

    const leads = await Lead.find({ promoterUserId: promoter._id }).sort({ createdAt: -1 });

    return NextResponse.json(leads);
  } catch (error) {
    console.error("GET promoter leads error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST create new lead
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "promoter") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { fullName, email, phone, preferredPlan, notes } = body;

    if (!fullName || !phone) {
      return NextResponse.json({ error: "Full Name and Phone Number are required" }, { status: 400 });
    }

    await dbConnect();

    const promoter = await User.findOne({ email: session.user.email });
    if (!promoter) {
      return NextResponse.json({ error: "Promoter profile not found" }, { status: 404 });
    }

    const newLead = await Lead.create({
      promoterUserId: promoter._id,
      fullName,
      email,
      phone,
      preferredPlan: preferredPlan || "Dream Policy - Life Insurance",
      status: "New",
      notes
    });

    return NextResponse.json({
      message: "Lead added successfully to your sales tracker.",
      lead: newLead
    });
  } catch (error) {
    console.error("POST promoter lead error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT update lead status
export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "promoter") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { leadId, status, notes } = body;

    if (!leadId || !status) {
      return NextResponse.json({ error: "Lead ID and Status are required" }, { status: 400 });
    }

    await dbConnect();

    const lead = await Lead.findById(leadId);
    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    // Security: Check if this lead belongs to the requesting promoter
    const promoter = await User.findOne({ email: session.user.email });
    if (lead.promoterUserId.toString() !== promoter._id.toString()) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    lead.status = status;
    if (notes !== undefined) {
      lead.notes = notes;
    }
    await lead.save();

    return NextResponse.json({
      message: "Lead status updated successfully.",
      lead
    });
  } catch (error) {
    console.error("PUT promoter lead error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
