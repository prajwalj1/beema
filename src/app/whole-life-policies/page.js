import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Whole Life Policies | Beema Dukaan",
  description: "Explore lifelong protection with Whole Life Policies from top insurers in Nepal.",
};

export default function WholeLifePage() {
  return (
    <main className="min-h-screen bg-[#FFFAF0] pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-neutral-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
          
          <h1 className="text-3xl md:text-5xl font-black text-neutral-900 mb-6 relative z-10">
            Whole Life Policies
          </h1>
          <p className="text-lg text-neutral-600 mb-8 relative z-10 leading-relaxed">
            Provide a lifetime of security for your loved ones. Unlike term insurance which only covers a specific period, a Whole Life Policy protects you for your entire life, meaning your family is guaranteed a payout.
          </p>

          <div className="space-y-6 relative z-10">
            <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
              <h3 className="text-xl font-bold text-amber-900 mb-2">Key Advantages</h3>
              <ul className="list-disc pl-5 text-amber-800 space-y-2">
                <li>Coverage that lasts your entire lifetime (typically up to age 99 or 100).</li>
                <li>Cash value accumulation that grows over time.</li>
                <li>Fixed premiums that never increase as you get older.</li>
                <li>Creates a legacy to leave behind for your children or beneficiaries.</li>
              </ul>
            </div>
            
            <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200">
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Who Is This For?</h3>
              <p className="text-neutral-600">
                Whole Life Insurance is ideal for those who want absolute certainty that their loved ones will receive a death benefit, regardless of when they pass away. It is also suitable for those looking for a safe, low-risk way to accumulate a cash value over decades.
              </p>
            </div>
          </div>

          <div className="mt-10 relative z-10">
            <Link href="/compare" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold transition-all shadow-md">
              Compare Plans Now
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
