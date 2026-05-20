import React from "react";
import Link from "next/link";

export default function WelcomeBanner({ session, profileDetails }) {
  const getInitials = (name) => {
    if (!name) return "C";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  return (
    <div className="bg-gradient-to-r from-brand-600 to-emerald-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl border border-emerald-500/10">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-24 translate-x-24"></div>
      <div className="relative flex flex-col md:flex-row items-center md:justify-between gap-6">
        <div className="flex items-center gap-5 text-center md:text-left flex-col md:flex-row">
          <div className="w-20 h-20 rounded-full border-4 border-white/20 bg-white/10 overflow-hidden flex items-center justify-center font-bold text-2xl shadow-inner shrink-0">
            {profileDetails?.image ? (
              <img src={profileDetails.image} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              getInitials(session?.user?.name)
            )}
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight">Hello, {session?.user?.name || "Customer"}!</h1>
            <p className="text-emerald-100 text-sm mt-1">Welcome back to your Beema Dukaan Portal.</p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full mt-3 uppercase tracking-wider backdrop-blur-sm">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              Customer Account (ID: {profileDetails?.customerCode || "C0000089"})
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Link href="/profile" className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-sm font-bold transition-all backdrop-blur-sm">
            Edit Profile
          </Link>
          <Link href="/#plans" className="px-5 py-3 bg-white/30 text-brand-700 rounded-xl text-sm font-black transition-all shadow-md">
            Buy New Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
