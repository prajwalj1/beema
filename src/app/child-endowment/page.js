import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Child Endowment Plans | Beema Dukaan",
  description: "Secure your child's future with our comprehensive Child Endowment plans.",
};

export default function ChildEndowmentPage() {
  return (
    <main className="min-h-screen bg-[#FFFAF0] pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-neutral-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
          
          <h1 className="text-3xl md:text-5xl font-black text-neutral-900 mb-6 relative z-10">
            Child Endowment Plans
          </h1>
          <p className="text-lg text-neutral-600 mb-8 relative z-10 leading-relaxed">
            Every parent dreams of providing the best for their child. Our Child Endowment plans are designed to help you build a secure financial foundation for their higher education, marriage, or any future aspirations. 
          </p>

          <div className="space-y-6 relative z-10">
            <div className="p-6 bg-brand-50 rounded-2xl border border-brand-100">
              <h3 className="text-xl font-bold text-brand-900 mb-2">Why Choose Child Endowment?</h3>
              <ul className="list-disc pl-5 text-brand-800 space-y-2">
                <li>Guaranteed returns on maturity to fund major life milestones.</li>
                <li>Life cover for the parent to ensure the child's future remains protected even in your absence.</li>
                <li>Tax benefits under existing laws.</li>
              </ul>
            </div>
            
            <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200">
              <h3 className="text-xl font-bold text-neutral-900 mb-2">How It Works</h3>
              <p className="text-neutral-600">
                You pay regular premiums for a chosen term. Once the policy matures, you receive a lump sum payout along with accrued bonuses. In the unfortunate event of the policyholder's demise, future premiums are typically waived, and the maturity amount is still paid to the child as planned.
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
