"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function CompareSection() {
  const [age, setAge] = useState(25);
  const [term, setTerm] = useState(15);

  // Dummy formulas for the simulator
  const premium = (age * 500) + (term * 1000) + 5000;
  const bonus = premium * term * 2;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat("en-IN").format(val);
  };

  const formatLakhs = (val) => {
    return (val / 100000).toFixed(1) + " Lakhs";
  };

  return (
    <section id="compare" className="py-20 md:py-28 bg-transparent border-t border-neutral-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-5xl font-extrabold text-neutral-900 tracking-tight">
              Comparison Engine Built For SaaS Speed
            </h2>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed">
              No more reading long, boring brochures. Filter and match insurance policies on a highly responsive, custom comparative table built for mobile screens first.
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-neutral-900">Insert parameters</h4>
                  <p className="text-xs md:text-sm text-neutral-500">Provide age, term lengths, and desired payout expectations.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-neutral-900">Analyze Premium & Bonus</h4>
                  <p className="text-xs md:text-sm text-neutral-500">View real-time premium updates dynamically side-by-side.</p>
                </div>
              </div>
            </div>
            
            <div className="pt-6">
              <Link href="/compare" className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5">
                Go to Comparison Engine
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full max-w-xl mx-auto">
            <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <span className="font-bold text-sm text-neutral-900">Active Premium Simulator</span>
                <span className="px-2 py-0.5 bg-brand-100 text-brand-700 text-[10px] font-extrabold rounded-md uppercase tracking-wider">Dynamic</span>
              </div>
              
              {/* Simulated interactive premium bar */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-neutral-500">Age: {age} Years</span>
                    <span className="text-brand-600 font-bold">Adjust slider</span>
                  </div>
                  <input 
                    type="range" 
                    min="18" 
                    max="65" 
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-brand-600" 
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-neutral-500">Term: {term} Years</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="30" 
                    value={term}
                    onChange={(e) => setTerm(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-brand-600" 
                  />
                </div>
                
                <div className="p-4 rounded-2xl bg-neutral-50 flex justify-between items-center transition-all duration-300">
                  <div>
                    <p className="text-xs text-neutral-500">Simulated Annual Premium</p>
                    <p className="text-2xl font-black text-neutral-900">Rs. {formatCurrency(premium)}</p>
                  </div>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-1 font-bold rounded-lg border border-emerald-100">
                    Estimated Bonus: Rs. {formatLakhs(bonus)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

