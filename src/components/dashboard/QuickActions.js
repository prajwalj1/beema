import React from "react";
import Link from "next/link";

export default function QuickActions() {
  return (
    <div className="bg-white rounded-3xl border border-neutral-100 shadow-md p-6">
      <h3 className="text-lg font-extrabold text-neutral-900 border-b border-neutral-50 pb-4 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        <a href="#payments-section" className="flex flex-col items-center justify-center p-4 bg-brand-50/50 hover:bg-brand-50 border border-brand-100 rounded-2xl transition-all group cursor-pointer text-center">
          <span className="w-10 h-10 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-sm">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"/>
            </svg>
          </span>
          <span className="text-xs font-bold text-brand-800">Pay Bill</span>
        </a>

        <a href="#policies-section" className="flex flex-col items-center justify-center p-4 bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100 rounded-2xl transition-all group cursor-pointer text-center">
          <span className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-sm">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </span>
          <span className="text-xs font-bold text-emerald-800">File Claim</span>
        </a>

        <Link href="/profile" className="flex flex-col items-center justify-center p-4 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-2xl transition-all group text-center">
          <span className="w-10 h-10 rounded-full bg-white text-neutral-500 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform border border-neutral-200 shadow-sm">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </span>
          <span className="text-xs font-bold text-neutral-700">Settings</span>
        </Link>

        <Link href="/change-password" className="flex flex-col items-center justify-center p-4 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-2xl transition-all group text-center">
          <span className="w-10 h-10 rounded-full bg-white text-neutral-500 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform border border-neutral-200 shadow-sm">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
          </span>
          <span className="text-xs font-bold text-neutral-700">Password</span>
        </Link>
      </div>
    </div>
  );
}
