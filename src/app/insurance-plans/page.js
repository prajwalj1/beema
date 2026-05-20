import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Insurance Plans | Beema Dukaan",
  description: "Explore our comprehensive range of insurance plans tailored for Nepali citizens.",
};

const plans = [
  {
    id: "child",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
      </svg>
    ),
    color: "from-violet-500 to-purple-600",
    light: "bg-violet-50",
    text: "text-violet-600",
    border: "hover:border-violet-400",
    badge: null,
    name: "Child Insurance",
    tagline: "Secure Their Future From Day One",
    description: "Protect your child's educational journey and life milestones. Our child plans cover higher education, marriage expenses, and include a premium waiver benefit in the event of an unforeseen parental loss.",
    features: ["Education fund at maturity", "Wedding expense coverage", "Premium waiver on parent's death", "Bonus accumulation annually"],
    startingFrom: "NPR 1,200/month",
    maturityAge: "18–25 years",
    sumAssured: "Up to NPR 50 Lakhs",
  },
  {
    id: "endowment",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    color: "from-emerald-500 to-teal-600",
    light: "bg-emerald-50",
    text: "text-emerald-600",
    border: "hover:border-emerald-400",
    badge: "MOST CHOSEN",
    badgeColor: "bg-emerald-500",
    name: "Endowment Savings",
    tagline: "Save Smart, Stay Protected",
    description: "The ideal blend of life cover and savings discipline. Earn guaranteed bonuses year after year while building a robust wealth pool for your family's future.",
    features: ["Life cover + savings combo", "Annual reversionary bonus", "Loan facility after 3 years", "Tax benefits on premium"],
    startingFrom: "NPR 2,500/month",
    maturityAge: "15–30 years",
    sumAssured: "Up to NPR 1 Crore",
  },
  {
    id: "whole-life",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    ),
    color: "from-blue-500 to-indigo-600",
    light: "bg-blue-50",
    text: "text-blue-600",
    border: "hover:border-blue-400",
    badge: null,
    name: "Whole Life Cover",
    tagline: "Protection That Never Expires",
    description: "Stay covered until age 100. This plan provides lifelong protection with massive legacy bonuses ensuring your next generation inherits maximum financial security.",
    features: ["Coverage up to age 100", "Legacy & estate planning", "High terminal bonus", "Guaranteed death benefit"],
    startingFrom: "NPR 3,500/month",
    maturityAge: "Until age 100",
    sumAssured: "Up to NPR 2 Crore",
  },
  {
    id: "health",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
      </svg>
    ),
    color: "from-rose-500 to-pink-600",
    light: "bg-rose-50",
    text: "text-rose-600",
    border: "hover:border-rose-400",
    badge: "NEW",
    badgeColor: "bg-rose-500",
    name: "Health Insurance",
    tagline: "Care for Every Moment",
    description: "Comprehensive medical coverage for you and your entire family. From routine check-ups to critical illness, we cover hospitalization costs, day-care procedures, and more.",
    features: ["Hospitalization coverage", "Critical illness lump sum", "Day-care procedures", "Family floater option"],
    startingFrom: "NPR 800/month",
    maturityAge: "Annual renewable",
    sumAssured: "Up to NPR 25 Lakhs",
  },
];

export default function InsurancePlansPage() {
  return (
    <main className="min-h-screen bg-[#FFFAF0]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-emerald-600 to-teal-700" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#FFFAF0]" style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }} />

        <div className="relative max-w-4xl mx-auto px-7 text-center text-white">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-sm text-white text-xs font-bold rounded-full mb-6 border border-white/20 uppercase tracking-widest">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
            Trusted by 10,000+ Nepali Families
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6">
            Insurance Plans<br />
            <span className="text-emerald-200">Built for Nepal</span>
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Choose from our curated range of life and health insurance products, designed to protect what matters most to you and your loved ones.
          </p>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`group relative bg-white rounded-3xl border-2 border-neutral-100 ${plan.border} transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden`}
            >
              {plan.badge && (
                <div className={`absolute top-0 right-0 ${plan.badgeColor} text-white text-[10px] tracking-widest font-black px-4 py-1.5 rounded-bl-2xl uppercase`}>
                  {plan.badge}
                </div>
              )}

              {/* Card Header */}
              <div className={`bg-gradient-to-br ${plan.color} p-8 text-white`}>
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                    {plan.icon}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/70 font-medium uppercase tracking-wider">Starting from</p>
                    <p className="text-sm font-black mt-1">{plan.startingFrom}</p>
                  </div>
                </div>
                <h2 className="text-2xl font-black mt-6 mb-1">{plan.name}</h2>
                <p className="text-sm text-white/80 font-medium">{plan.tagline}</p>
              </div>

              {/* Card Body */}
              <div className="p-8">
                <p className="text-sm text-neutral-500 leading-relaxed mb-6">{plan.description}</p>

                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className={`${plan.light} rounded-2xl p-4`}>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-bold mb-1">Term</p>
                    <p className={`text-sm font-black ${plan.text}`}>{plan.maturityAge}</p>
                  </div>
                  <div className={`${plan.light} rounded-2xl p-4`}>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-bold mb-1">Sum Assured</p>
                    <p className={`text-sm font-black ${plan.text}`}>{plan.sumAssured}</p>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-8">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-neutral-600">
                      <div className={`w-5 h-5 rounded-full ${plan.light} ${plan.text} flex items-center justify-center shrink-0`}>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/register"
                  className={`w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r ${plan.color} text-white rounded-xl font-bold text-sm transition-all hover:shadow-lg hover:opacity-90`}
                >
                  Get Started
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gradient-to-r from-brand-600 to-emerald-600 rounded-3xl p-10 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-20 translate-x-20" />
          <h2 className="text-2xl md:text-3xl font-black mb-3">Not sure which plan is right for you?</h2>
          <p className="text-emerald-100 mb-8 max-w-xl mx-auto text-sm">Use our comparison tool to evaluate plans side-by-side, or chat with our advisors for a personalised recommendation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/compare" className="px-8 py-3.5 bg-white/30 text-brand-700 rounded-xl font-black text-sm  transition-all shadow-lg">
              Compare Plans
            </Link>
            <Link href="/contact" className="px-8 py-3.5 bg-white/15 border border-white/30 text-white rounded-xl font-bold text-sm hover:bg-white/25 transition-all backdrop-blur-sm">
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
