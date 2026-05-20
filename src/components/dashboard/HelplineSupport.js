import React from "react";

export default function HelplineSupport() {
  return (
    <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl p-6 text-white border border-neutral-800 relative overflow-hidden shadow-lg">
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl translate-x-4 -translate-y-4"></div>
      <h4 className="font-extrabold text-base">Need Assistance?</h4>
      <p className="text-xs text-neutral-400 mt-1">Talk to our 24/7 dedicated support team for claims and policy queries.</p>
      
      <div className="mt-5 space-y-3">
        <a href="tel:16600188888" className="flex items-center gap-3 text-sm font-semibold bg-white/10 hover:bg-white/20 p-3 rounded-xl border border-white/10 transition-all">
          <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
          1660-01-88888 (Toll Free)
        </a>
        <a href="mailto:support@beemadukaan.com" className="flex items-center gap-3 text-sm font-semibold bg-white/10 hover:bg-white/20 p-3 rounded-xl border border-white/10 transition-all">
          <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          support@beemadukaan.com
        </a>
      </div>
    </div>
  );
}
