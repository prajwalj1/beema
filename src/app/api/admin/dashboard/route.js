import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/dbConnect";
import PreProposal from "@/models/PreProposal";
import Policy from "@/models/Policy";
import Payment from "@/models/Payment";
import User from "@/models/User";
import PayoutRequest from "@/models/PayoutRequest";
import Lead from "@/models/Lead";

export const dynamic = "force-dynamic";

// GET admin dashboard stats and collections
export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    // 1. Stats Cards
    const totalUsers = await User.countDocuments();
    const totalCustomers = await User.countDocuments({ role: "customer" });
    const totalPromoters = await User.countDocuments({ role: "promoter" });
    
    const activePolicies = await Policy.countDocuments({ status: "Active" });
    const pendingPreProposals = await PreProposal.countDocuments({ status: "pending" });

    // Sum of all successful payments
    const payments = await Payment.find({ status: "Success" });
    const totalRevenue = payments.reduce((acc, p) => acc + p.amount, 0);

    // 2. Fetch Pending and Completed Pre-Proposals
    const preProposals = await PreProposal.find().sort({ createdAt: -1 }).lean();

    // 3. Fetch Promoters with referred client count and info
    const promoters = await User.find({ role: "promoter" }).select("-password").lean();
    const promotersData = await Promise.all(
      promoters.map(async (p) => {
        // Count referred clients
        const referredCount = await User.countDocuments({
          role: "customer",
          referredBy: p.promoterId
        });
        
        // Sum commission (based on policies of referred users)
        const referredUsers = await User.find({
          role: "customer",
          referredBy: p.promoterId
        }).select("_id name email createdAt");
        
        const referredUserIds = referredUsers.map(u => u._id);
        const activePolicies = await Policy.find({ userId: { $in: referredUserIds } });
        const totalCommission = activePolicies.reduce((acc, pol) => acc + Math.round(pol.premium * 0.1), 0);

        // Map referred clients with detailed status
        const referredClients = await Promise.all(
          referredUsers.map(async (client) => {
            const policy = await Policy.findOne({ userId: client._id });
            return {
              id: client._id,
              name: client.name,
              email: client.email,
              createdAt: client.createdAt ? client.createdAt.toISOString().split("T")[0] : "N/A",
              hasPolicy: !!policy,
              policyName: policy ? policy.policyName : null,
              premium: policy ? policy.premium : 0,
              status: policy ? "Active / Paid" : "Referred (No Policy)"
            };
          })
        );

        return {
          id: p._id,
          name: p.name,
          email: p.email,
          phone: p.phone,
          promoterId: p.promoterId || "N/A",
          referredCount,
          totalCommission,
          referredClients,
          createdAt: p.createdAt ? p.createdAt.toISOString().split("T")[0] : "N/A"
        };
      })
    );

    // 4. Fetch Payout Requests
    const payoutRequests = await PayoutRequest.find().sort({ createdAt: -1 }).lean();

    // 5. Fetch Leads
    const leads = await Lead.find().populate("promoterUserId", "name promoterId").sort({ createdAt: -1 }).lean();
    const leadsData = leads.map(l => ({
      _id: l._id,
      fullName: l.fullName,
      email: l.email,
      phone: l.phone,
      preferredPlan: l.preferredPlan,
      status: l.status,
      notes: l.notes,
      promoterName: l.promoterUserId?.name || "N/A",
      promoterId: l.promoterUserId?.promoterId || "N/A",
      createdAt: l.createdAt ? l.createdAt.toISOString().split("T")[0] : "N/A"
    }));

    return NextResponse.json({
      stats: {
        totalUsers,
        totalCustomers,
        totalPromoters,
        activePolicies,
        pendingPreProposals,
        totalRevenue
      },
      preProposals,
      promoters: promotersData,
      payoutRequests,
      leads: leadsData
    });
  } catch (error) {
    console.error("GET Admin Dashboard error:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred on the server." },
      { status: 500 }
    );
  }
}

// POST admin actions (Approve Pre-proposal, payout promoter)
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { action, targetId } = body;

    if (!action || !targetId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await dbConnect();

    if (action === "approve-pre-proposal") {
      const preProposal = await PreProposal.findById(targetId);
      if (!preProposal) {
        return NextResponse.json({ error: "Pre-Proposal not found" }, { status: 404 });
      }

      if (preProposal.status === "approved") {
        return NextResponse.json({ error: "Pre-Proposal is already approved" }, { status: 400 });
      }

      // 1. Update PreProposal status
      preProposal.status = "approved";
      await preProposal.save();

      // 2. Compute dynamic premium
      const sumAssured = preProposal.sumAssured || 100000;
      const policyTerm = preProposal.policyTerm || 15;
      const premiumMode = preProposal.premiumMode || "yearly";

      const annualPremium = Math.round(sumAssured * 0.04);
      let calculatedPremium = annualPremium;
      if (premiumMode === "quarterly") {
        calculatedPremium = Math.round(annualPremium / 4);
      } else if (premiumMode === "monthly") {
        calculatedPremium = Math.round(annualPremium / 12);
      } else if (premiumMode === "half-yearly") {
        calculatedPremium = Math.round(annualPremium / 2);
      }

      // Generate policy number
      const randNo = Math.floor(10000000 + Math.random() * 90000000).toString();
      const policyNumber = `POL-${randNo}`;

      // Calculate expiry date
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + policyTerm);

      // Determine Plan Name (default to whole life plan unless specified)
      const planName = preProposal.planName || "whole life plan";

      // 3. Create active Policy
      const newPolicy = await Policy.create({
        userId: preProposal.userId,
        preProposalId: preProposal._id,
        policyNumber,
        planName,
        provider: "Beema Dukaan",
        sumAssured,
        premium: calculatedPremium,
        premiumMode,
        status: "Active",
        startDate: new Date(),
        expiryDate
      });

      // 4. Create initial Payment Success transaction
      const txnNo = Math.floor(1000000000 + Math.random() * 9000000000).toString();
      await Payment.create({
        userId: preProposal.userId,
        policyId: newPolicy._id,
        policyNumber,
        transactionId: `TXN-${txnNo}`,
        amount: calculatedPremium,
        paymentMethod: "eSewa",
        status: "Success",
        paymentDate: new Date()
      });

      return NextResponse.json({
        message: "Pre-Proposal approved successfully. Policy generated and initial payment success registered.",
        policy: newPolicy
      });
    }

    if (action === "reject-pre-proposal") {
      const preProposal = await PreProposal.findById(targetId);
      if (!preProposal) {
        return NextResponse.json({ error: "Pre-Proposal not found" }, { status: 404 });
      }

      preProposal.status = "rejected";
      await preProposal.save();

      return NextResponse.json({ message: "Pre-proposal rejected successfully." });
    }

    if (action === "approve-payout") {
      const payout = await PayoutRequest.findById(targetId);
      if (!payout) {
        return NextResponse.json({ error: "Payout request not found" }, { status: 404 });
      }
      payout.status = "Approved";
      await payout.save();
      return NextResponse.json({ message: "Payout request approved and processed successfully." });
    }

    if (action === "reject-payout") {
      const payout = await PayoutRequest.findById(targetId);
      if (!payout) {
        return NextResponse.json({ error: "Payout request not found" }, { status: 404 });
      }
      payout.status = "Rejected";
      await payout.save();
      return NextResponse.json({ message: "Payout request rejected successfully." });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("POST Admin Action error:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred on the server." },
      { status: 500 }
    );
  }
}
