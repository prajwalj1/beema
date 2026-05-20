"use client";

import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Import Admin Sub-Components
import AdminStats from "@/components/adminComp/AdminStats";
import AdminPreProposalTable from "@/components/adminComp/AdminPreProposalTable";
import AdminPromoterTable from "@/components/adminComp/AdminPromoterTable";
import ProposalDetailModal from "@/components/adminComp/ProposalDetailModal";
import AdminPayoutRequestsTable from "@/components/adminComp/AdminPayoutRequestsTable";
import AdminLeadsTable from "@/components/adminComp/AdminLeadsTable";
import PromoterDetailAdminModal from "@/components/adminComp/PromoterDetailAdminModal";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("proposals"); // "proposals", "promoters", "payouts", "leads"
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [selectedProposal, setSelectedProposal] = useState(null); // Modal details view
  const [selectedPromoter, setSelectedPromoter] = useState(null); // Promoter inspect details

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      if (session.user.role !== "admin") {
        router.push("/dashboard/customer");
      } else {
        fetchDashboardData();
      }
    }
  }, [status, session]);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch("/api/admin/dashboard");
      if (res.ok) {
        const data = await res.json();
        setDashboardData(data);
      } else {
        toast.error("Failed to load admin telemetry data.");
      }
    } catch (err) {
      console.error("Telemetry fetch error:", err);
      toast.error("An error occurred while connecting to the admin API.");
    } finally {
      setLoading(false);
    }
  };

  const handleProposalAction = async (id, action) => {
    setActionLoading(id);
    try {
      const res = await fetch("/api/admin/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, targetId: id }),
      });

      if (res.ok) {
        const result = await res.json();
        toast.success(result.message || "Action processed successfully!");
        setSelectedProposal(null);
        fetchDashboardData(); // Refresh values
      } else {
        const errData = await res.json();
        toast.error(errData.error || "Action execution failed.");
      }
    } catch (err) {
      console.error("Action error:", err);
      toast.error("Communication error occurred.");
    } finally {
      setActionLoading(null);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#070F21]">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const { stats, preProposals = [], promoters = [], payoutRequests = [], leads = [] } = dashboardData || {};

  return (
    <div className="min-h-screen bg-[#070F21] text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-slide-up">
        
        {/* Admin Header */}
        <div className="bg-gradient-to-r from-[#0F1C3F] via-[#142654] to-[#0F1C3F] rounded-3xl p-6 sm:p-8 border border-blue-900/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-center md:text-left flex-col md:flex-row">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 font-extrabold text-2xl shadow-inner select-none">
              AD
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Admin Console
              </h1>
              <p className="text-blue-200 text-sm mt-1">Underwriting, agency oversight, and telemetry.</p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-400 text-xs font-bold rounded-full mt-3 uppercase tracking-wider border border-amber-500/20 select-none">
                Authorized Executive Session
              </div>
            </div>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="px-5 py-3 bg-red-950/40 hover:bg-red-900/40 border border-red-900/30 text-red-400 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer"
          >
            Terminal Terminate (Sign Out)
          </button>
        </div>

        {/* Admin Stats Grid (Modularized) */}
        <AdminStats stats={stats} />

        {/* Tab Controls */}
        <div className="flex border-b border-blue-900/40 overflow-x-auto gap-4 scrollbar-none select-none">
          <button
            onClick={() => setActiveTab("proposals")}
            className={`pb-4 px-2 font-bold text-sm tracking-wide transition-all uppercase shrink-0 border-b-2 cursor-pointer ${
              activeTab === "proposals"
                ? "border-amber-500 text-amber-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            Pre-Proposal Verification Hub ({preProposals.length})
          </button>
          <button
            onClick={() => setActiveTab("promoters")}
            className={`pb-4 px-2 font-bold text-sm tracking-wide transition-all uppercase shrink-0 border-b-2 cursor-pointer ${
              activeTab === "promoters"
                ? "border-amber-500 text-amber-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            Agency Network ({promoters.length})
          </button>
          <button
            onClick={() => setActiveTab("payouts")}
            className={`pb-4 px-2 font-bold text-sm tracking-wide transition-all uppercase shrink-0 border-b-2 cursor-pointer ${
              activeTab === "payouts"
                ? "border-amber-500 text-amber-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            Commission Payouts ({payoutRequests.length})
          </button>
          <button
            onClick={() => setActiveTab("leads")}
            className={`pb-4 px-2 font-bold text-sm tracking-wide transition-all uppercase shrink-0 border-b-2 cursor-pointer ${
              activeTab === "leads"
                ? "border-amber-500 text-amber-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            Promoter Sales Leads ({leads.length})
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === "proposals" && (
          <div className="space-y-6">
            <AdminPreProposalTable 
              preProposals={preProposals}
              onViewFile={setSelectedProposal}
              onApprove={(id) => handleProposalAction(id, "approve-pre-proposal")}
              onReject={(id) => handleProposalAction(id, "reject-pre-proposal")}
              actionLoading={actionLoading}
            />
          </div>
        )}

        {activeTab === "promoters" && (
          <div className="space-y-6">
            <AdminPromoterTable 
              promoters={promoters} 
              onSelectPromoter={setSelectedPromoter}
            />
          </div>
        )}

        {activeTab === "payouts" && (
          <div className="space-y-6">
            <AdminPayoutRequestsTable 
              payoutRequests={payoutRequests}
              onApprove={(id) => handleProposalAction(id, "approve-payout")}
              onReject={(id) => handleProposalAction(id, "reject-payout")}
              actionLoading={actionLoading}
            />
          </div>
        )}

        {activeTab === "leads" && (
          <div className="space-y-6">
            <AdminLeadsTable leads={leads} />
          </div>
        )}

      </div>

      {/* Verification Detailed Modal Drawer (Modularized) */}
      <ProposalDetailModal 
        proposal={selectedProposal}
        onClose={() => setSelectedProposal(null)}
        onApprove={(id) => handleProposalAction(id, "approve-pre-proposal")}
        onReject={(id) => handleProposalAction(id, "reject-pre-proposal")}
        actionLoading={actionLoading}
      />

      {/* Promoter Inspection Modal (New dynamic detailed view) */}
      <PromoterDetailAdminModal 
        promoter={selectedPromoter}
        leads={leads}
        onClose={() => setSelectedPromoter(null)}
      />
    </div>
  );
}
