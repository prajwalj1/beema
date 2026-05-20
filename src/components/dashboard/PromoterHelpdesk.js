import React from "react";

export default function PromoterHelpdesk() {
  return (
    <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl p-6 text-white border border-neutral-800 relative overflow-hidden shadow-lg">
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl translate-x-4 -translate-y-4"></div>
      <h4 className="font-extrabold text-base">Promoter Helpdesk</h4>
      <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
        Need help recruiting or have commission payout discrepancies? Get in touch with our team.
      </p>
      
      <div className="mt-5">
        <a 
          href="mailto:partners@beemadukaan.com" 
          className="flex items-center gap-3 text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 p-3 rounded-xl border border-white/10 transition-all justify-center sm:justify-start"
        >
          <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          partners@beemadukaan.com
        </a>
      </div>
    </div>
  );
}
