import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Policy from "@/models/Policy";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "promoter") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    // Find the promoter's own profile to get their promoterId
    const promoter = await User.findOne({ email: session.user.email });
    if (!promoter || !promoter.promoterId) {
      return NextResponse.json({ error: "Promoter profile not found" }, { status: 404 });
    }

    // Find all customers referred by this promoter's ID
    const referredUsers = await User.find({
      role: "customer",
      referredBy: promoter.promoterId
    }).select("name email createdAt");

    // For each referred user, check if they have any active policy
    const referralsData = await Promise.all(
      referredUsers.map(async (client) => {
        const policy = await Policy.findOne({ userId: client._id });
        const hasBoughtPolicy = !!policy;

        return {
          id: `REF-${client._id.toString().substring(18).toUpperCase()}`,
          name: client.name,
          email: client.email,
          date: client.createdAt.toISOString().split("T")[0],
          status: hasBoughtPolicy ? "Verified" : "Pending Approval",
          commissionAmt: hasBoughtPolicy ? Math.round(policy.premium * 0.1) : 0 // 10% commission on premium
        };
      })
    );

    return NextResponse.json(referralsData);
  } catch (error) {
    console.error("GET referrals error:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred on the server." },
      { status: 500 }
    );
  }
}
