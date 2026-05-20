import React from "react";

export default function PromoterQuickStats({ referralsCount = 0, commissionEarned = 0, conversionRate = "0%" }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
        </div>
        <div>
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Total Referrals</p>
          <h3 className="text-2xl font-black text-neutral-800 mt-1">{referralsCount}</h3>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16v1M10 21h4a2 2 0 002-2V7a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
        </div>
        <div>
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Commission Earned</p>
          <h3 className="text-2xl font-black text-neutral-800 mt-1">NPR {commissionEarned.toLocaleString()}</h3>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <div>
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Conversion Rate</p>
          <h3 className="text-2xl font-black text-neutral-800 mt-1">{conversionRate}</h3>
        </div>
      </div>
    </div>
  );
}
