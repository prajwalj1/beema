"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import QuickStats from "@/components/dashboard/QuickStats";
import SubscribedPolicies from "@/components/dashboard/SubscribedPolicies";
import PaymentBreakdownChart from "@/components/dashboard/PaymentBreakdownChart";
import PreProposalTable from "@/components/dashboard/PreProposalTable";
import PaymentTable from "@/components/dashboard/PaymentTable";
import QuickActions from "@/components/dashboard/QuickActions";
import HelplineSupport from "@/components/dashboard/HelplineSupport";
import DreamPolicyWidget from "@/components/DreamPolicyWidget";
import ClaimsTable from "@/components/dashboard/ClaimsTable";

export default function CustomerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileDetails, setProfileDetails] = useState(null);
  const [preProposalsCount, setPreProposalsCount] = useState(0);
  const [policiesCount, setPoliciesCount] = useState(0);
  const [premiumDue, setPremiumDue] = useState(0);
  const [refreshClaims, setRefreshClaims] = useState(0);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      if (session.user.role !== "customer") {
        router.push("/dashboard/promoter");
      } else {
        fetchProfile();
      }
    }
  }, [status, session]);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/user/profile");
      if (res.ok) {
        const data = await res.json();
        setProfileDetails(data);
      }
    } catch (err) {
      console.error("Error fetching profile on dashboard:", err);
    } finally {
      setLoadingProfile(false);
    }
  };

  if (status === "loading" || loadingProfile) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#FFFAF0]">
        <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFAF0] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Banner */}
        <WelcomeBanner session={session} profileDetails={profileDetails} />

        {/* Quick Stats Grid */}
        <QuickStats policiesCount={policiesCount} preProposalsCount={preProposalsCount} premiumDue={premiumDue} />

        {/* Dashboard Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Column (2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Subscribed Policies */}
            <SubscribedPolicies 
              onUpdateCount={setPoliciesCount} 
              onUpdatePremium={setPremiumDue} 
              session={session}
              profileDetails={profileDetails}
              onClaimSubmitted={() => setRefreshClaims((prev) => prev + 1)}
            />

            {/* Payment Breakdown Chart */}
            <PaymentBreakdownChart />

            {/* PreProposal Table */}
            <PreProposalTable onUpdateCount={setPreProposalsCount}/>

            {/* Claims Table */}
            <ClaimsTable refreshTrigger={refreshClaims} />

            {/* Payment Table */}
            <PaymentTable />
          </div>

          {/* Quick Actions & Help Column (1/3 width) */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <QuickActions />

            {/* Helpline Support */}
            <HelplineSupport />
           
          </div>

        </div>
      </div>
      <DreamPolicyWidget />
    </div>
  );
}
