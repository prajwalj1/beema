"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Import Promoter Components
import PromoterWelcomeBanner from "@/components/dashboard/PromoterWelcomeBanner";
import PromoterQuickStats from "@/components/dashboard/PromoterQuickStats";
import ReferralLinkWidget from "@/components/dashboard/ReferralLinkWidget";
import ReferredClientsTable from "@/components/dashboard/ReferredClientsTable";
import PromoterOperations from "@/components/dashboard/PromoterOperations";
import PromoterHelpdesk from "@/components/dashboard/PromoterHelpdesk";
import PromoterLeadsTable from "@/components/dashboard/PromoterLeadsTable";
import PromoterPayoutsList from "@/components/dashboard/PromoterPayoutsList";

export default function PromoterDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileDetails, setProfileDetails] = useState(null);

  // Stats states managed dynamically from ReferredClientsTable updates
  const [referralsCount, setReferralsCount] = useState(0);
  const [commissionEarned, setCommissionEarned] = useState(0);
  const [conversionRate, setConversionRate] = useState("0%");

  // Modals state
  const [isPayoutOpen, setIsPayoutOpen] = useState(false);
  const [isLeadOpen, setIsLeadOpen] = useState(false);
  const [isPosterOpen, setIsPosterOpen] = useState(false);
  const [isShareQuoteOpen, setIsShareQuoteOpen] = useState(false);

  // Form states
  const [payoutMethod, setPayoutMethod] = useState("eSewa");
  const [payoutAmt, setPayoutAmt] = useState("");
  const [esewaId, setEsewaId] = useState("");
  const [acName, setAcName] = useState("");
  const [bankName, setBankName] = useState("");
  const [acNumber, setAcNumber] = useState("");
  const [submittingPayout, setSubmittingPayout] = useState(false);

  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadPlan, setLeadPlan] = useState("whole life plan");
  const [leadNotes, setLeadNotes] = useState("");
  const [submittingLead, setSubmittingLead] = useState(false);

  // Table refresh triggers
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      if (session.user.role !== "promoter") {
        router.push("/dashboard/customer");
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
      console.error("Error fetching profile on promoter dashboard:", err);
    } finally {
      setLoadingProfile(false);
    }
  };

  const copyReferralLink = () => {
    const promoId = profileDetails?.promoterId || "PRM-XXXXXX";
    const refLink = `${window.location.origin}/register?promoterId=${promoId}`;
    navigator.clipboard.writeText(refLink);
    toast.success("Referral link copied to clipboard!");
  };

  const handlePayoutSubmit = async (e) => {
    e.preventDefault();
    if (!payoutAmt || Number(payoutAmt) <= 0) {
      toast.error("Please enter a valid payout amount.");
      return;
    }

    setSubmittingPayout(true);
    try {
      const payload = {
        amount: Number(payoutAmt),
        payoutMethod,
        details: payoutMethod === "eSewa" 
          ? { esewaId, accountName: acName }
          : { bankName, accountNumber: acNumber, accountName: acName }
      };

      const res = await fetch("/api/promoter/payout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        toast.success("Commission withdrawal request registered!");
        setIsPayoutOpen(false);
        setPayoutAmt("");
        setEsewaId("");
        setAcName("");
        setBankName("");
        setAcNumber("");
        setRefreshTrigger(prev => prev + 1);
      } else {
        const err = await res.json();
        toast.error(err.error || "Withdrawal request failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network communication issue.");
    } finally {
      setSubmittingPayout(false);
    }
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!leadName || !leadPhone) {
      toast.error("Full Name and Phone Number are required.");
      return;
    }

    setSubmittingLead(true);
    try {
      const res = await fetch("/api/promoter/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: leadName,
          email: leadEmail,
          phone: leadPhone,
          preferredPlan: leadPlan,
          notes: leadNotes
        })
      });

      if (res.ok) {
        toast.success("Sales lead logged successfully!");
        setIsLeadOpen(false);
        setLeadName("");
        setLeadEmail("");
        setLeadPhone("");
        setLeadPlan("whole life plan");
        setLeadNotes("");
        setRefreshTrigger(prev => prev + 1);
      } else {
        const err = await res.json();
        toast.error(err.error || "Could not log lead.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network communication issue.");
    } finally {
      setSubmittingLead(false);
    }
  };

  if (status === "loading" || loadingProfile) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#FFFAF0]">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const promoId = profileDetails?.promoterId || "PRM-XXXXXX";
  // If running locally, mobile phones can't resolve 'localhost'. Use a placeholder domain for demo purposes.
  const origin = typeof window !== 'undefined' && window.location.origin.includes("localhost") 
    ? "https://beemadukaan.vercel.app" 
    : typeof window !== 'undefined' ? window.location.origin : "";
  const promoLink = `${origin}/register?promoterId=${promoId}`;

  return (
    <div className="min-h-screen bg-[#FFFAF0] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-slide-up">
        
        {/* Welcome Banner */}
        <PromoterWelcomeBanner 
          session={session} 
          profileDetails={profileDetails} 
          onCopyReferral={copyReferralLink} 
        />

        {/* Quick Stats Grid */}
        <PromoterQuickStats 
          referralsCount={referralsCount} 
          commissionEarned={commissionEarned} 
          conversionRate={conversionRate} 
        />

        {/* Shareable Referral Link Widget */}
        <ReferralLinkWidget 
          profileDetails={profileDetails} 
          onCopyReferral={copyReferralLink} 
        />

        {/* Dashboard Main Grid (Responsive Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Column (2/3 width on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            <ReferredClientsTable 
              key={`clients-${refreshTrigger}`}
              onUpdateCount={setReferralsCount}
              onUpdateCommission={setCommissionEarned}
              onUpdateRate={setConversionRate}
            />

            {/* Dynamic Leads Tracker (New Functionality) */}
            <PromoterLeadsTable 
              refreshTrigger={refreshTrigger}
              onLeadConverted={() => setRefreshTrigger(prev => prev + 1)}
            />
          </div>

          {/* Quick Actions, Payout List & Help Column (1/3 width on desktop) */}
          <div className="space-y-6">
            <PromoterOperations 
              onRequestPayout={() => setIsPayoutOpen(true)}
              onAddLead={() => setIsLeadOpen(true)}
              onGeneratePoster={() => setIsPosterOpen(true)}
              onShareQuote={() => setIsShareQuoteOpen(true)}
            />

            {/* Dynamic Payout Ledger list (New Functionality) */}
            <PromoterPayoutsList refreshTrigger={refreshTrigger} />

            <PromoterHelpdesk />
          </div>

        </div>

      </div>

      {/* 1. Request Payout Modal */}
      {isPayoutOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl p-6 sm:p-8 animate-scale-up">
            <div className="flex justify-between items-center border-b border-neutral-100 pb-4 mb-4">
              <h3 className="text-lg font-black text-neutral-900">Request Payout</h3>
              <button 
                onClick={() => setIsPayoutOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 font-bold hover:bg-neutral-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePayoutSubmit} className="space-y-4 text-xs font-semibold text-neutral-700">
              <div>
                <label className="block text-[10px] text-neutral-400 uppercase tracking-widest font-black mb-1.5">
                  Payout Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPayoutMethod("eSewa")}
                    className={`py-2 px-4 rounded-xl border text-center transition-all cursor-pointer ${
                      payoutMethod === "eSewa"
                        ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                        : "border-neutral-200 hover:bg-neutral-50"
                    }`}
                  >
                    eSewa Wallet
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayoutMethod("Bank Transfer")}
                    className={`py-2 px-4 rounded-xl border text-center transition-all cursor-pointer ${
                      payoutMethod === "Bank Transfer"
                        ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                        : "border-neutral-200 hover:bg-neutral-50"
                    }`}
                  >
                    Bank Account
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-neutral-400 uppercase tracking-widest font-black mb-1.5">
                  Withdrawal Amount (NPR)
                </label>
                <input
                  type="number"
                  required
                  value={payoutAmt}
                  onChange={(e) => setPayoutAmt(e.target.value)}
                  placeholder="e.g. 2000"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>

              {payoutMethod === "eSewa" ? (
                <>
                  <div>
                    <label className="block text-[10px] text-neutral-400 uppercase tracking-widest font-black mb-1.5">
                      eSewa ID (Mobile Number)
                    </label>
                    <input
                      type="text"
                      required
                      value={esewaId}
                      onChange={(e) => setEsewaId(e.target.value)}
                      placeholder="98XXXXXXXX"
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-neutral-400 uppercase tracking-widest font-black mb-1.5">
                      Account Registered Name
                    </label>
                    <input
                      type="text"
                      required
                      value={acName}
                      onChange={(e) => setAcName(e.target.value)}
                      placeholder="Account Owner Full Name"
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-[10px] text-neutral-400 uppercase tracking-widest font-black mb-1.5">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      required
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder="e.g. Nabil Bank"
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-neutral-400 uppercase tracking-widest font-black mb-1.5">
                      Account Number
                    </label>
                    <input
                      type="text"
                      required
                      value={acNumber}
                      onChange={(e) => setAcNumber(e.target.value)}
                      placeholder="Bank Account Number"
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-neutral-400 uppercase tracking-widest font-black mb-1.5">
                      Account Name
                    </label>
                    <input
                      type="text"
                      required
                      value={acName}
                      onChange={(e) => setAcName(e.target.value)}
                      placeholder="Exact Name on Account"
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={submittingPayout}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all shadow-md font-black tracking-wide text-xs mt-3 flex items-center justify-center cursor-pointer"
              >
                {submittingPayout ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  "Submit Withdrawal Request"
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. Log Customer Lead Modal */}
      {isLeadOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl p-6 sm:p-8 animate-scale-up">
            <div className="flex justify-between items-center border-b border-neutral-100 pb-4 mb-4">
              <h3 className="text-lg font-black text-neutral-900">Log New Lead</h3>
              <button 
                onClick={() => setIsLeadOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 font-bold hover:bg-neutral-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-4 text-xs font-semibold text-neutral-700">
              <div>
                <label className="block text-[10px] text-neutral-400 uppercase tracking-widest font-black mb-1.5">
                  Prospect Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder="e.g. Bijay Thapa"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-[10px] text-neutral-400 uppercase tracking-widest font-black mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="text"
                  required
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  placeholder="98XXXXXXXX"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-[10px] text-neutral-400 uppercase tracking-widest font-black mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-[10px] text-neutral-400 uppercase tracking-widest font-black mb-1.5">
                  Policy Interest Plan
                </label>
                <select
                  value={leadPlan}
                  onChange={(e) => setLeadPlan(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 font-semibold"
                >
                  <option value="whole life plan">Whole Life Plan</option>
                  <option value="wtm plan">WTM Plan</option>
                  <option value="etm plan">ETM Plan</option>
                  <option value="wt plan">WT Plan</option>
                  <option value="endowment plan">Endowment Plan</option>
                  <option value="child plan">Child Plan</option>
                  <option value="health insurance">Health Insurance</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-neutral-400 uppercase tracking-widest font-black mb-1.5">
                  Pipeline Follow-up Notes
                </label>
                <textarea
                  value={leadNotes}
                  onChange={(e) => setLeadNotes(e.target.value)}
                  placeholder="Preferences, budget, call back time..."
                  rows={3}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
              </div>

              <button
                type="submit"
                disabled={submittingLead}
                className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white rounded-xl transition-all shadow-md font-black tracking-wide text-xs mt-3 flex items-center justify-center cursor-pointer"
              >
                {submittingLead ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  "Log Prospect Lead"
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. Referral Poster Modal */}
      {isPosterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl p-6 sm:p-8 animate-scale-up text-center">
            <div className="flex justify-between items-center border-b border-neutral-100 pb-3 mb-4">
              <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">Your Referral Card</h3>
              <button 
                onClick={() => setIsPosterOpen(false)}
                className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 font-bold hover:bg-neutral-200 text-xs"
              >
                ✕
              </button>
            </div>

            {/* Simulated Poster Graphic */}
            <div className="bg-gradient-to-br from-[#0F1C3F] to-[#070F21] p-6 rounded-2xl text-white relative shadow-lg overflow-hidden border border-blue-900/30">
              <div className="absolute top-[-10%] right-[-10%] w-[150px] h-[150px] bg-amber-500/5 rounded-full blur-2xl"></div>
              <h4 className="text-xs font-black uppercase text-amber-500 tracking-widest">BeemaDukaan</h4>
              <p className="text-[10px] text-blue-200 mt-1">Get Protected Instantly</p>
              
              <div className="my-6 bg-white p-3 rounded-xl inline-block shadow-inner">
                {/* Real Dynamic QR Code */}
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(promoLink)}`} 
                  alt="Referral QR Code" 
                  className="w-24 h-24 object-contain"
                />
              </div>

              <p className="text-[10px] font-bold text-neutral-300">Scan QR Code or visit:</p>
              <p className="text-[9px] bg-blue-950/40 border border-blue-900/50 py-1.5 px-3 rounded-lg text-emerald-400 font-mono mt-2 select-all overflow-hidden text-ellipsis whitespace-nowrap">
                {promoLink}
              </p>
              <div className="mt-4 border-t border-blue-900/40 pt-3 flex justify-between items-center text-[9px] text-neutral-400">
                <span>Code: <span className="font-bold text-white font-mono">{promoId}</span></span>
                <span className="font-bold text-emerald-400">Affiliate Member</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
              <button
                onClick={() => {
                  toast.success("Poster card saved to downloads!");
                  setIsPosterOpen(false);
                }}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-md cursor-pointer"
              >
                Save Image
              </button>
              <button
                onClick={copyReferralLink}
                className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl font-bold transition-all cursor-pointer"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* 4. Share Marketing Quotes Modal */}
      {isShareQuoteOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl p-6 sm:p-8 animate-scale-up">
            <div className="flex justify-between items-center border-b border-neutral-100 pb-4 mb-4">
              <h3 className="text-lg font-black text-neutral-900">Share Policy Quote</h3>
              <button 
                onClick={() => setIsShareQuoteOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 font-bold hover:bg-neutral-200"
              >
                ✕
              </button>
            </div>
            
            <p className="text-xs text-neutral-500 mb-6 font-medium">Select a plan to instantly share coverage details and your direct affiliate link with prospects.</p>

            <div className="space-y-4">
              <div className="p-4 border border-neutral-200 rounded-2xl hover:border-purple-300 hover:bg-purple-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-neutral-800 text-sm">Whole Life Insurance</h4>
                  <span className="text-[9px] font-black uppercase bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full">Top Seller</span>
                </div>
                <p className="text-xs text-neutral-400 mb-3">Comprehensive lifetime coverage with investment bonuses.</p>
                <div className="flex gap-2">
                  <button onClick={() => { toast.success("Quote sent to WhatsApp!"); setIsShareQuoteOpen(false); }} className="flex-1 py-2 bg-[#25D366] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#1ebd59] transition-colors">
                    WhatsApp
                  </button>
                  <button onClick={() => { navigator.clipboard.writeText(`Check out Whole Life Insurance via my link: ${promoLink}`); toast.success("Quote text copied!"); }} className="flex-1 py-2 bg-neutral-100 text-neutral-700 rounded-xl text-xs font-bold hover:bg-neutral-200 transition-colors">
                    Copy Text
                  </button>
                </div>
              </div>

              <div className="p-4 border border-neutral-200 rounded-2xl hover:border-purple-300 hover:bg-purple-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-neutral-800 text-sm">Child Education Plan</h4>
                </div>
                <p className="text-xs text-neutral-400 mb-3">Secure your child's future with guaranteed maturity benefits.</p>
                <div className="flex gap-2">
                  <button onClick={() => { toast.success("Quote sent to WhatsApp!"); setIsShareQuoteOpen(false); }} className="flex-1 py-2 bg-[#25D366] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#1ebd59] transition-colors">
                    WhatsApp
                  </button>
                  <button onClick={() => { navigator.clipboard.writeText(`Check out Child Education Plan via my link: ${promoLink}`); toast.success("Quote text copied!"); }} className="flex-1 py-2 bg-neutral-100 text-neutral-700 rounded-xl text-xs font-bold hover:bg-neutral-200 transition-colors">
                    Copy Text
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
