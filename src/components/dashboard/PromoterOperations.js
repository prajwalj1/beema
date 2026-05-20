export default function PromoterOperations({ onRequestPayout, onAddLead, onGeneratePoster, onShareQuote }) {
  return (
    <div className="bg-white rounded-3xl border border-neutral-100 shadow-md p-6">
      <h3 className="text-lg font-extrabold text-neutral-900 border-b border-neutral-50 pb-4 mb-4">
        Agency Operations
      </h3>
      <div className="space-y-3">
        {/* Request Payout */}
        <button 
          onClick={onRequestPayout}
          className="w-full flex items-center justify-between p-4 bg-emerald-50/30 hover:bg-emerald-50 border border-emerald-100/50 rounded-2xl transition-all group text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16v1M10 21h4a2 2 0 002-2V7a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </span>
            <div>
              <h4 className="text-xs font-bold text-emerald-900">Request Commission Payout</h4>
              <p className="text-[10px] text-neutral-400 mt-0.5">Transfer cash directly to eSewa / bank</p>
            </div>
          </div>
          <svg className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        {/* Submit Lead */}
        <button 
          onClick={onAddLead}
          className="w-full flex items-center justify-between p-4 bg-sky-50/30 hover:bg-sky-50 border border-sky-100/50 rounded-2xl transition-all group text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
              </svg>
            </span>
            <div>
              <h4 className="text-xs font-bold text-sky-900">Log Customer Lead</h4>
              <p className="text-[10px] text-neutral-400 mt-0.5">Track and nurture new policy clients</p>
            </div>
          </div>
          <svg className="w-4 h-4 text-sky-600 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        {/* Generate Poster */}
        <button 
          onClick={onGeneratePoster}
          className="w-full flex items-center justify-between p-4 bg-neutral-50 hover:bg-neutral-100/70 border border-neutral-200/50 rounded-2xl transition-all group text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-white text-neutral-500 border border-neutral-200 flex items-center justify-center shrink-0 shadow-sm">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </span>
            <div>
              <h4 className="text-xs font-bold text-neutral-700">Generate Referral Poster</h4>
              <p className="text-[10px] text-neutral-400 mt-0.5">Create graphic banner with your QR</p>
            </div>
          </div>
          <svg className="w-4 h-4 text-neutral-600 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
        {/* Share Quotes */}
        <button 
          onClick={onShareQuote}
          className="w-full flex items-center justify-between p-4 bg-purple-50/30 hover:bg-purple-50 border border-purple-100/50 rounded-2xl transition-all group text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 shadow-sm">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
              </svg>
            </span>
            <div>
              <h4 className="text-xs font-bold text-purple-900">Share Marketing Quotes</h4>
              <p className="text-[10px] text-neutral-400 mt-0.5">Send policy details via WhatsApp/Social</p>
            </div>
          </div>
          <svg className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
