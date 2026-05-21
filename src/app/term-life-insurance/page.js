import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Term Life Insurance | Beema Dukaan",
  description: "Secure high coverage at affordable premiums with Term Life Insurance.",
};

export default function TermLifePage() {
  return (
    <main className="min-h-screen bg-[#FFFAF0] pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-neutral-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
          
          <h1 className="text-3xl md:text-5xl font-black text-neutral-900 mb-6 relative z-10">
            Term Life Insurance
          </h1>
          <p className="text-lg text-neutral-600 mb-8 relative z-10 leading-relaxed">
            The purest and most affordable form of life insurance. Term insurance provides your family with a substantial financial safety net in case of an unforeseen event, ensuring their lifestyle and dreams are never compromised.
          </p>

          <div className="space-y-6 relative z-10">
            <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100">
              <h3 className="text-xl font-bold text-purple-900 mb-2">Why Choose Term Insurance?</h3>
              <ul className="list-disc pl-5 text-purple-800 space-y-2">
                <li>High life cover at exceptionally low premium rates.</li>
                <li>Financial protection to pay off debts or loans in your absence.</li>
                <li>Peace of mind knowing your family's living expenses are secured.</li>
                <li>Flexible payout options (lump sum, monthly income, etc.).</li>
              </ul>
            </div>
            
            <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200">
              <h3 className="text-xl font-bold text-neutral-900 mb-2">How It Works</h3>
              <p className="text-neutral-600">
                You select a coverage amount (sum assured) and a policy term (e.g., 20 or 30 years). If the policyholder passes away during this term, the nominees receive the full coverage amount. If the policyholder survives the term, there is typically no maturity benefit, which is why the premiums are so low.
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
