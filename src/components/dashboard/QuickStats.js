import React from "react";

export default function QuickStats({ policiesCount = 2, preProposalsCount = 0, premiumDue = 0 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-md hover:shadow-lg transition-shadow flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
        </div>
        <div>
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Active Policies</p>
          <h3 className="text-2xl font-black text-neutral-800 mt-1">{policiesCount}</h3>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-md hover:shadow-lg transition-shadow flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
          </svg>
        </div>
        <div>
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Pending Pre-Proposals</p>
          <h3 className="text-2xl font-black text-neutral-800 mt-1">{preProposalsCount}</h3>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-md hover:shadow-lg transition-shadow flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16v1M10 21h4a2 2 0 002-2V7a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
        </div>
        <div>
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Premium Due</p>
          <h3 className="text-2xl font-black text-neutral-800 mt-1">
            {premiumDue > 0 ? `NPR ${premiumDue.toLocaleString()}/yr` : "NPR 0/yr"}
          </h3>
        </div>
      </div>
    </div>
  );
}
