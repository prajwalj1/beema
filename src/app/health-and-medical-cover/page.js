import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Health & Medical Cover | Beema Dukaan",
  description: "Find the best health insurance and medical cover plans in Nepal.",
};

export default function HealthCoverPage() {
  return (
    <main className="min-h-screen bg-[#FFFAF0] pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-neutral-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
          
          <h1 className="text-3xl md:text-5xl font-black text-neutral-900 mb-6 relative z-10">
            Health & Medical Cover
          </h1>
          <p className="text-lg text-neutral-600 mb-8 relative z-10 leading-relaxed">
            Medical emergencies come unannounced and can severely dent your savings. Our comprehensive health insurance plans shield you and your family against spiraling medical costs.
          </p>

          <div className="space-y-6 relative z-10">
            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
              <h3 className="text-xl font-bold text-blue-900 mb-2">What's Covered?</h3>
              <ul className="list-disc pl-5 text-blue-800 space-y-2">
                <li>In-patient hospitalization expenses.</li>
                <li>Pre and post hospitalization costs.</li>
                <li>Day care procedures that don't require 24-hour hospitalization.</li>
                <li>Critical illness riders for severe medical conditions.</li>
              </ul>
            </div>
            
            <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200">
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Cashless Treatments</h3>
              <p className="text-neutral-600">
                With our network of top hospitals across Nepal, you can avail of cashless treatments, ensuring you focus entirely on your recovery instead of worrying about organizing funds at the last minute.
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
