import React from "react";
import Link from "next/link";

export default function PromoterWelcomeBanner({ session, profileDetails, onCopyReferral }) {
  const getInitials = (name) => {
    if (!name) return "P";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  return (
    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-teal-500/10">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-24 translate-x-24"></div>
      <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5 text-center lg:text-left flex-col lg:flex-row">
          <div className="w-20 h-20 rounded-full border-4 border-white/20 bg-white/10 overflow-hidden flex items-center justify-center font-bold text-2xl shadow-inner shrink-0">
            {profileDetails?.image ? (
              <img src={profileDetails.image} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              getInitials(session?.user?.name)
            )}
          </div>
          <div className="flex flex-col items-center lg:items-start">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Hello, {session?.user?.name || "Agent"}!
            </h1>
            <p className="text-emerald-100 text-sm mt-1">Welcome to your Agency & Promoter Dashboard.</p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full mt-3 uppercase tracking-wider backdrop-blur-sm">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Promoter Account (ID: {profileDetails?.promoterId || "P0000089"})
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0 justify-center">
          <Link href="/profile" className="px-5 py-3 text-center bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs sm:text-sm font-bold transition-all backdrop-blur-sm">
            Edit Profile
          </Link>
          <button 
            onClick={onCopyReferral}
            className="px-5 py-3 bg-white text-emerald-700 hover:bg-neutral-50 rounded-xl text-xs sm:text-sm font-black transition-all shadow-md flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
            </svg>
            Copy Refer Link
          </button>
        </div>
      </div>
    </div>
  );
}
