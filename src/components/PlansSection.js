import React from "react";
import Link from "next/link";

export default function PlansSection() {
  return (
    <section id="plans" className="py-20 bg-transparent border-t border-neutral-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold text-neutral-900 tracking-tight">
            Explore Our Comprehensive Plans
          </h2>
          <p className="text-base md:text-lg text-neutral-600">
            Pick from handpicked and optimized categories of digital insurance suited perfectly for Nepali citizens.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Child Insurance */}
          <div className="group p-8 rounded-3xl bg-white border border-neutral-200/60 hover:border-brand-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3">Child Insurance</h3>
            <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
              Secure your children's primary/higher education and eventual wedding expenses. Includes premium waiver benefit in case of unforeseen events.
            </p>
            <Link href="/insurance-plans" className="inline-flex items-center text-sm text-brand-600 font-bold group-hover:underline">
              Explore Plans
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </Link>
          </div>

          {/* Endowment Plans */}
          <div className="group p-8 rounded-3xl bg-white border border-neutral-200/60 hover:border-emerald-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-brand-500 text-white text-[10px] tracking-wide font-extrabold px-3.5 py-1 rounded-bl-2xl">
              MOST CHOSEN
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3">Endowment savings</h3>
            <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
              Enjoy combined benefits of reliable life coverage and disciplined savings. Build a strong wealth pool while securing your dependents.
            </p>
            <Link href="/insurance-plans" className="inline-flex items-center text-sm text-brand-600 font-bold group-hover:underline">
              Explore Plans
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </Link>
          </div>

          {/* Whole Life Policies */}
          <div className="group p-8 rounded-3xl bg-white border border-neutral-200/60 hover:border-emerald-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3">Whole Life Cover</h3>
            <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
              Stay secured till the age of 100 with massive legacy and bonus returns. Ideal for providing maximum financial protection to next generations.
            </p>
            <Link href="/insurance-plans" className="inline-flex items-center text-sm text-brand-600 font-bold group-hover:underline">
              Explore Plans
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </Link>
          </div>

          {/* Health Insurance */}
          <div className="group p-8 rounded-3xl bg-white border border-neutral-200/60 hover:border-blue-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] tracking-wide font-extrabold px-3.5 py-1 rounded-bl-2xl">
              NEW
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3">Health Insurance</h3>
            <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
              Comprehensive medical coverage for you and your family. Includes hospitalization, critical illness, and preventive care benefits.
            </p>
            <Link href="/insurance-plans" className="inline-flex items-center text-sm text-brand-600 font-bold group-hover:underline">
              Explore Plans
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
