'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleCompare = () => {
    const q = search.trim();
    router.push(q ? `/compare?query=${encodeURIComponent(q)}` : '/compare');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleCompare();
  };

  return (
    <section className="relative pt-2 pb-24 md:pt-4 md:pb-32 overflow-hidden bg-transparent">
      {/* Soft background blobs */}
      <div
        className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[300px] h-[300px] md:w-[800px] md:h-[800px] bg-brand-50/60 rounded-full blur-3xl opacity-60 -z-10 animate-pulse"
        style={{ animationDuration: '8s' }}
      />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[250px] h-[250px] md:w-[600px] md:h-[600px] bg-emerald-50/40 rounded-full blur-3xl opacity-50 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

          {/* ── Left Column ── */}
          <div className="flex-1 text-center lg:text-left space-y-6 md:space-y-8 animate-slide-up">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50/80 text-brand-600 text-xs md:text-sm font-semibold border border-brand-100/60">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-500 animate-ping" />
              Nepal's Next-Gen Digital Insurance Marketplace
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-neutral-900 tracking-tight leading-[1.1] md:leading-[1.05]">
              Smart Insurance <br className="hidden sm:block" />
              <span className="gradient-text">For Every Nepali.</span>
            </h1>

            {/* Sub-text */}
            <p className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Beema Dukaan simplifies finding, comparing, and securing insurance. Whether you are looking for child plans, long-term endowment policies, health coverage, or combined packages, we help you make data-driven choices instantly.
            </p>

            {/* ── Quick Search Widget ── */}
            <div className="p-2 md:p-3 bg-white rounded-2xl md:rounded-full border border-neutral-200 shadow-lg max-w-2xl mx-auto lg:mx-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Input */}
              <div className="flex-1 flex items-center gap-3 px-4 py-2 border-b sm:border-b-0 sm:border-r border-neutral-100">
                <svg className="w-5 h-5 text-neutral-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Enter child's age or insurance type..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-0 outline-none text-neutral-800 placeholder-slate-400 text-sm focus:ring-0 focus:outline-none"
                />
                {/* Clear button */}
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="text-neutral-300 hover:text-neutral-500 transition-colors shrink-0"
                    aria-label="Clear search"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Compare Now button */}
              <button
                onClick={handleCompare}
                className="px-6 py-3.5 rounded-xl md:rounded-full bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition-all duration-300 shadow-md shadow-brand-500/20 hover:shadow-lg hover:shadow-brand-500/30 flex items-center justify-center gap-2"
              >
                Compare Now
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-6 text-xs md:text-sm text-neutral-500">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span>100% Free Comparison</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span>Authorized Partners only</span>
              </div>
            </div>
          </div>

          {/* ── Right Column (Dashboard Preview) ── */}
          <div className="flex-1 w-full relative max-w-xl lg:max-w-none mx-auto animate-float">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/10 to-emerald-500/10 rounded-3xl blur-2xl opacity-60" />

            <div className="relative rounded-3xl glass-card p-3 md:p-4 shadow-xl border border-neutral-200/60 backdrop-blur-xl">
              <div className="bg-white rounded-2xl overflow-hidden shadow-inner border border-neutral-100">
                {/* Browser bar */}
                <div className="h-10 bg-neutral-50 border-b border-neutral-100 flex items-center justify-between px-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="text-[10px] text-neutral-400 font-mono tracking-wider">BEEMADUKAAN.COM</div>
                  <div className="w-3" />
                </div>

                {/* Dashboard content */}
                <div className="p-4 md:p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-neutral-100">
                    <div>
                      <h3 className="font-bold text-neutral-900 text-base">Comparison Portal</h3>
                      <p className="text-xs text-neutral-500">Comparing 3 Top Endowment Plans</p>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100/50">Live Sync</span>
                  </div>

                  <div className="space-y-3">
                    {/* Plan Row 1 – highlighted */}
                    <div className="p-3.5 rounded-xl border border-brand-100 bg-brand-50/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition-all hover:scale-[1.01] hover:bg-brand-50/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-sm">A</div>
                        <div>
                          <h4 className="font-bold text-sm text-neutral-900">Nepal Life - Bal Shiksha</h4>
                          <p className="text-xs text-neutral-500">Child Future • Bonus: Rs 65/Thousand</p>
                        </div>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-neutral-100">
                        <span className="text-xs text-neutral-400">Premium/Yr</span>
                        <span className="font-extrabold text-brand-600 text-sm">Rs 45,200</span>
                      </div>
                    </div>

                    {/* Plan Row 2 */}
                    <div className="p-3.5 rounded-xl border border-neutral-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition-all hover:scale-[1.01] hover:bg-neutral-50/40">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-sm">B</div>
                        <div>
                          <h4 className="font-bold text-sm text-neutral-900">LIC Nepal - Jeevan Anand</h4>
                          <p className="text-xs text-neutral-500">Whole Life Endowment • Bonus: Rs 58/Thousand</p>
                        </div>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-neutral-100">
                        <span className="text-xs text-neutral-400">Premium/Yr</span>
                        <span className="font-extrabold text-neutral-800 text-sm">Rs 48,000</span>
                      </div>
                    </div>

                    {/* Plan Row 3 */}
                    <div className="p-3.5 rounded-xl border border-neutral-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition-all hover:scale-[1.01] hover:bg-neutral-50/40">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-sm">C</div>
                        <div>
                          <h4 className="font-bold text-sm text-neutral-900">National Life - My Child</h4>
                          <p className="text-xs text-neutral-500">Education Plan • Bonus: Rs 63/Thousand</p>
                        </div>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-neutral-100">
                        <span className="text-xs text-neutral-400">Premium/Yr</span>
                        <span className="font-extrabold text-neutral-800 text-sm">Rs 46,100</span>
                      </div>
                    </div>
                  </div>

                  {/* Lock In Best Rate CTA */}
                  <Link
                    href="/best-rate"
                    className="w-full py-3.5 rounded-xl bg-neutral-900 text-white font-semibold text-sm hover:opacity-95 transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Lock In Best Rate
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
