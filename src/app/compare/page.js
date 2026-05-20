"use client";

import React, { useState } from "react";
import Link from "next/link";

const plans = [
  {
    id: "child",
    name: "Child Plan",
    color: "violet",
    premium: 1200,
    sumAssured: 1000000,
    term: "18–25 yrs",
    coverage: "Education + Wedding",
    bonuses: true,
    premiumWaiver: true,
    loanFacility: false,
    criticalIllness: false,
    healthCoverage: false,
    taxBenefit: true,
    familyFloater: false,
    gradient: "from-violet-500 to-purple-600",
    light: "bg-violet-50 border-violet-200",
    badge: null,
  },
  {
    id: "endowment",
    name: "Endowment",
    color: "emerald",
    premium: 2500,
    sumAssured: 2500000,
    term: "15–30 yrs",
    coverage: "Life + Savings",
    bonuses: true,
    premiumWaiver: false,
    loanFacility: true,
    criticalIllness: false,
    healthCoverage: false,
    taxBenefit: true,
    familyFloater: false,
    gradient: "from-emerald-500 to-teal-600",
    light: "bg-emerald-50 border-emerald-200",
    badge: "MOST CHOSEN",
  },
  {
    id: "whole-life",
    name: "Whole Life",
    color: "blue",
    premium: 3500,
    sumAssured: 5000000,
    term: "Until age 100",
    coverage: "Lifetime Cover",
    bonuses: true,
    premiumWaiver: false,
    loanFacility: true,
    criticalIllness: false,
    healthCoverage: false,
    taxBenefit: true,
    familyFloater: false,
    gradient: "from-blue-500 to-indigo-600",
    light: "bg-blue-50 border-blue-200",
    badge: null,
  },
  {
    id: "health",
    name: "Health",
    color: "rose",
    premium: 800,
    sumAssured: 500000,
    term: "Annual",
    coverage: "Medical + Critical",
    bonuses: false,
    premiumWaiver: false,
    loanFacility: false,
    criticalIllness: true,
    healthCoverage: true,
    taxBenefit: true,
    familyFloater: true,
    gradient: "from-rose-500 to-pink-600",
    light: "bg-rose-50 border-rose-200",
    badge: "NEW",
  },
];

const features = [
  { key: "premium", label: "Starting Premium", format: (v) => `NPR ${v.toLocaleString()}/mo` },
  { key: "sumAssured", label: "Max Sum Assured", format: (v) => `NPR ${(v / 100000).toFixed(0)}L` },
  { key: "term", label: "Policy Term", format: (v) => v },
  { key: "coverage", label: "Coverage Type", format: (v) => v },
  { key: "bonuses", label: "Annual Bonuses", format: (v) => v },
  { key: "premiumWaiver", label: "Premium Waiver", format: (v) => v },
  { key: "loanFacility", label: "Loan Facility", format: (v) => v },
  { key: "criticalIllness", label: "Critical Illness", format: (v) => v },
  { key: "healthCoverage", label: "Health Coverage", format: (v) => v },
  { key: "familyFloater", label: "Family Floater", format: (v) => v },
  { key: "taxBenefit", label: "Tax Benefit", format: (v) => v },
];

const colorMap = {
  violet: { text: "text-violet-600", bg: "bg-violet-600", ring: "ring-violet-400" },
  emerald: { text: "text-emerald-600", bg: "bg-emerald-600", ring: "ring-emerald-400" },
  blue: { text: "text-blue-600", bg: "bg-blue-600", ring: "ring-blue-400" },
  rose: { text: "text-rose-600", bg: "bg-rose-600", ring: "ring-rose-400" },
};

export default function ComparePage() {
  const [selected, setSelected] = useState(["endowment", "health"]);

  const togglePlan = (id) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev;
        return prev.filter((p) => p !== id);
      }
      if (prev.length >= 4) return [...prev.slice(1), id];
      return [...prev, id];
    });
  };

  const activePlans = plans.filter((p) => selected.includes(p.id));

  return (
    <main className="min-h-screen bg-[#FFFAF0]">
      {/* Hero */}
      <section className="relative pt-32 pb-30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(45deg, white 1px, transparent 1px), linear-gradient(-45deg, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#FFFAF0]" style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }} />
        <div className="relative max-w-3xl mx-auto px-4 text-center text-white">
          <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
            Side-by-Side Comparison
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Compare Plans<br />
            <span className="text-slate-300">Find Your Perfect Fit</span>
          </h1>
          <p className="text-slate-300 text-lg">
            Select up to 4 plans below and compare them feature-by-feature to make an informed decision.
          </p>
        </div>
      </section>

      {/* Plan Selector */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-center text-xs text-neutral-400 uppercase tracking-widest font-bold mb-6">Select Plans to Compare</p>
        <div className="flex flex-wrap justify-center gap-3">
          {plans.map((plan) => {
            const isActive = selected.includes(plan.id);
            const colors = colorMap[plan.color];
            return (
              <button
                key={plan.id}
                onClick={() => togglePlan(plan.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border-2 text-sm font-bold transition-all ${
                  isActive
                    ? `${colors.bg} text-white border-transparent shadow-md ring-2 ${colors.ring} ring-offset-2`
                    : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300"
                }`}
              >
                {isActive && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/>
                  </svg>
                )}
                {plan.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-white rounded-3xl shadow-xl border border-neutral-100 overflow-hidden">
          {/* Plan Headers */}
          <div className="grid border-b border-neutral-100" style={{ gridTemplateColumns: `220px repeat(${activePlans.length}, 1fr)` }}>
            <div className="p-6 flex items-end">
              <span className="text-xs text-neutral-400 uppercase tracking-widest font-bold">Feature</span>
            </div>
            {activePlans.map((plan) => {
              const colors = colorMap[plan.color];
              return (
                <div key={plan.id} className={`p-6 text-center bg-gradient-to-b ${plan.light} border-l border-neutral-100 relative`}>
                  {plan.badge && (
                    <span className={`absolute top-3 right-3 ${colors.bg} text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider`}>
                      {plan.badge}
                    </span>
                  )}
                  <p className={`text-lg font-black ${colors.text}`}>{plan.name}</p>
                  <p className="text-xs text-neutral-400 mt-1">Insurance Plan</p>
                </div>
              );
            })}
          </div>

          {/* Feature Rows */}
          {features.map((feat, idx) => (
            <div
              key={feat.key}
              className={`grid border-b border-neutral-50 ${idx % 2 === 0 ? "bg-white" : "bg-neutral-50/50"}`}
              style={{ gridTemplateColumns: `220px repeat(${activePlans.length}, 1fr)` }}
            >
              <div className="px-6 py-4 flex items-center">
                <span className="text-sm text-neutral-600 font-semibold">{feat.label}</span>
              </div>
              {activePlans.map((plan) => {
                const val = plan[feat.key];
                const colors = colorMap[plan.color];
                const display = feat.format(val);
                const isBool = typeof val === "boolean";
                return (
                  <div key={plan.id} className="px-6 py-4 text-center border-l border-neutral-100 flex items-center justify-center">
                    {isBool ? (
                      val ? (
                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${colors.bg} text-white shadow-sm`}>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/>
                          </svg>
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-neutral-100 text-neutral-300">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                        </span>
                      )
                    ) : (
                      <span className={`text-sm font-bold ${colors.text}`}>{display}</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          {/* CTA Row */}
          <div className="grid" style={{ gridTemplateColumns: `220px repeat(${activePlans.length}, 1fr)` }}>
            <div className="p-6" />
            {activePlans.map((plan) => {
              const colors = colorMap[plan.color];
              return (
                <div key={plan.id} className="p-4 border-l border-neutral-100">
                  <Link
                    href="/register"
                    className={`w-full flex items-center justify-center py-3 bg-gradient-to-r ${plan.gradient} text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all hover:shadow-lg`}
                  >
                    Choose Plan
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
