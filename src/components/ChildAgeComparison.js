"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function ChildAgeComparison() {
  const [childAge, setChildAge] = useState(5);
  const [coverageAmount, setCoverageAmount] = useState(1000000); // 10 Lakhs
  const maturityAge = 21; 
  
  // Simulated dynamic calculation
  const termLength = maturityAge - childAge;
  const estimatedAnnualPremium = Math.round((coverageAmount * 0.9) / termLength);
  const estimatedBonus = Math.round(coverageAmount * 0.65); // 65% bonus estimate
  const totalMaturityPayout = coverageAmount + estimatedBonus;

  return (
    <section className="py-20 bg-white border-t border-neutral-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Side: Interactive Calculator */}
          <div className="flex-1 w-full max-w-xl mx-auto">
            <div className="bg-neutral-50 rounded-[2rem] p-8 md:p-10 border border-neutral-200 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-500 to-emerald-500"></div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-extrabold text-neutral-900">Child Future Calculator</h3>
                <p className="text-sm text-neutral-500 mt-2">Adjust the sliders to estimate returns at age 21.</p>
              </div>

              <div className="space-y-8">
                {/* Child Age Slider */}
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-3">
                    <span className="text-neutral-700">Child's Current Age</span>
                    <span className="text-brand-600 font-bold bg-brand-50 px-3 py-1 rounded-lg">{childAge} Years</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="15" 
                    value={childAge}
                    onChange={(e) => setChildAge(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-brand-600" 
                  />
                  <div className="flex justify-between text-xs text-neutral-400 mt-2">
                    <span>Newborn</span>
                    <span>15 Years</span>
                  </div>
                </div>

                {/* Coverage Amount Slider */}
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-3">
                    <span className="text-neutral-700">Desired Coverage (Sum Assured)</span>
                    <span className="text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-lg">Rs. {(coverageAmount / 100000).toFixed(1)} Lakhs</span>
                  </div>
                  <input 
                    type="range" 
                    min="500000" 
                    max="5000000" 
                    step="100000"
                    value={coverageAmount}
                    onChange={(e) => setCoverageAmount(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-emerald-500" 
                  />
                  <div className="flex justify-between text-xs text-neutral-400 mt-2">
                    <span>5 Lakhs</span>
                    <span>50 Lakhs</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Results */}
              <div className="mt-10 p-6 bg-white rounded-2xl border border-neutral-100 shadow-sm">
                <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider mb-2">Estimated Return at Age {maturityAge}</p>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl md:text-4xl font-black text-neutral-900">Rs. {(totalMaturityPayout / 100000).toFixed(2)}</span>
                  <span className="text-sm font-bold text-neutral-400">Lakhs</span>
                </div>
                
                <div className="flex items-center justify-between text-sm border-t border-neutral-100 pt-4">
                  <span className="text-neutral-500">Est. Yearly Premium:</span>
                  <span className="font-bold text-brand-600">Rs. {estimatedAnnualPremium.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Text & Context */}
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
              Smart Planning
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
              Secure Their <span className="text-brand-600">Education</span> & Future.
            </h2>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed">
              Our Child Endowment plans ensure that your child's higher education or marriage is financially secured, regardless of life's uncertainties. Start comparing tailored plans today.
            </p>
            
            <ul className="space-y-4 pt-4">
              <li className="flex gap-3 items-center text-sm font-semibold text-neutral-700">
                <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                </div>
                Premium Waiver Benefit upon unfortunate events.
              </li>
              <li className="flex gap-3 items-center text-sm font-semibold text-neutral-700">
                <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                </div>
                Guaranteed tax-free maturity payout.
              </li>
              <li className="flex gap-3 items-center text-sm font-semibold text-neutral-700">
                <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                </div>
                Flexible premium payment terms.
              </li>
            </ul>
            <div className="pt-6">
              <Link href="/dashboard/customer" className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-500 transition-colors shadow-lg shadow-brand-500/20">
                Buy New Policies
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
