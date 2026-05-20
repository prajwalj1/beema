import React from "react";

export default function ReferralLinkWidget({ profileDetails, onCopyReferral }) {
  const referralUrl = typeof window !== "undefined"
    ? `${window.location.origin}/auth?tab=signup&as=promoter&referrer_id=${profileDetails?.promoterId || "P0000089"}`
    : `https://beemadokaan.com/auth?tab=signup&as=promoter&referrer_id=${profileDetails?.promoterId || "P0000089"}`;

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(referralUrl)}&color=059669`;

  return (
    <div className="bg-white rounded-3xl border border-neutral-100 shadow-md p-6 sm:p-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Side: Referral Info */}
        <div className="flex-1 space-y-4 w-full">
          <div>
            <h2 className="text-lg font-extrabold text-neutral-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
              </svg>
              Your Dynamic Referral Link
            </h2>
            <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
              Share this link or let clients scan the QR code. Any user who signs up through your referral details will automatically be registered as your client, earning you commission when they purchase policies.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="text" 
              readOnly 
              value={referralUrl}
              className="flex-1 px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono font-bold text-neutral-600 focus:outline-none select-all"
            />
            <button 
              onClick={onCopyReferral}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-md shrink-0 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              Copy Link
            </button>
          </div>
        </div>

        {/* Right Side: QR Code */}
        <div className="flex flex-col items-center justify-center p-4 border border-neutral-100 rounded-2xl bg-neutral-50/50 shrink-0 w-full md:w-auto">
          <div className="bg-white p-2.5 rounded-xl border border-neutral-200/50 shadow-inner">
            <img 
              src={qrCodeUrl} 
              alt="Referral QR Code" 
              className="w-32 h-32 object-contain"
              loading="lazy"
            />
          </div>
          <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mt-3 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Scan to Register
          </span>
        </div>

      </div>
    </div>
  );
}
