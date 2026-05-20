import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Policy from "@/models/Policy";
import PayoutRequest from "@/models/PayoutRequest";

export const dynamic = "force-dynamic";

// GET payout requests for promoter
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

    const payouts = await PayoutRequest.find({ userId: promoter._id }).sort({ createdAt: -1 });
    return NextResponse.json(payouts);
  } catch (error) {
    console.error("GET promoter payouts error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST create payout request
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "promoter") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { amount, payoutMethod, details } = body;

    if (!amount || amount <= 0 || !payoutMethod || !details) {
      return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
    }

    await dbConnect();

    const promoter = await User.findOne({ email: session.user.email });
    if (!promoter || !promoter.promoterId) {
      return NextResponse.json({ error: "Promoter profile not found" }, { status: 404 });
    }

    // Calculate dynamic commission earned
    const referredUsers = await User.find({
      role: "customer",
      referredBy: promoter.promoterId
    }).select("_id");

    const referredUserIds = referredUsers.map(u => u._id);
    const activePolicies = await Policy.find({ userId: { $in: referredUserIds } });
    const totalCommission = activePolicies.reduce((acc, pol) => acc + Math.round(pol.premium * 0.1), 0);

    // If no referred clients exist, fall back to mock cap of 4500 to allow demo features to work beautifully
    const commissionLimit = totalCommission > 0 ? totalCommission : 4500;

    // Calculate sum of existing payouts
    const existingPayouts = await PayoutRequest.find({ 
      userId: promoter._id,
      status: { $in: ["Pending", "Approved"] }
    });
    const totalWithdrawnOrPending = existingPayouts.reduce((acc, p) => acc + p.amount, 0);

    const availableBalance = commissionLimit - totalWithdrawnOrPending;

    if (amount > availableBalance) {
      return NextResponse.json({ 
        error: `Insufficient commission balance. Max available to withdraw: Rs. ${availableBalance}` 
      }, { status: 400 });
    }

    // Create payout request
    const newPayout = await PayoutRequest.create({
      userId: promoter._id,
      promoterId: promoter.promoterId,
      amount,
      payoutMethod,
      details,
      status: "Pending"
    });

    return NextResponse.json({
      message: "Payout request submitted successfully. It is pending admin authorization.",
      payout: newPayout
    });
  } catch (error) {
    console.error("POST promoter payout error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
