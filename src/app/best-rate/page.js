'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const plans = [
  {
    id: 'nepal-life-bal',
    company: 'Nepal Life',
    plan: 'Bal Shiksha',
    type: 'Child Plan',
    premium: 45200,
    sumAssured: 1000000,
    bonus: 65,
    term: '20 yrs',
    tag: 'BEST VALUE',
    tagColor: 'bg-brand-600',
    highlight: true,
    gradient: 'from-brand-500 to-emerald-500',
    icon: '🏆',
  },
  {
    id: 'national-life-child',
    company: 'National Life',
    plan: 'My Child',
    type: 'Education Plan',
    premium: 46100,
    sumAssured: 1000000,
    bonus: 63,
    term: '20 yrs',
    tag: 'POPULAR',
    tagColor: 'bg-emerald-500',
    highlight: false,
    gradient: 'from-teal-500 to-cyan-500',
    icon: '🎓',
  },
  {
    id: 'lic-jeevan',
    company: 'LIC Nepal',
    plan: 'Jeevan Anand',
    type: 'Whole Life Endowment',
    premium: 48000,
    sumAssured: 1000000,
    bonus: 58,
    term: '30 yrs',
    tag: null,
    tagColor: '',
    highlight: false,
    gradient: 'from-blue-500 to-indigo-500',
    icon: '🛡️',
  },
];

const features = [
  { label: 'Annual Premium', key: 'premium', format: (v) => `Rs ${v.toLocaleString()}` },
  { label: 'Sum Assured', key: 'sumAssured', format: (v) => `Rs ${(v / 100000).toFixed(0)} Lakh` },
  { label: 'Annual Bonus /K', key: 'bonus', format: (v) => `Rs ${v}` },
  { label: 'Policy Term', key: 'term', format: (v) => v },
];

export default function BestRatePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [locked, setLocked] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [lockedPlan, setLockedPlan] = useState(null);

  const handleLock = async (planId) => {
    if (status === "loading") return; // wait for session to load

    if (status === "unauthenticated") {
      toast.error("Please login to lock a rate.", { duration: 3000 });
      router.push("/login?callbackUrl=/best-rate");
      return;
    }

    const plan = plans.find((p) => p.id === planId);
    if (!plan) return;

    setLocked(planId);
    setLoading(true);

    try {
      const res = await fetch("/api/locked-rates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan.id,
          company: plan.company,
          planName: plan.plan,
          premium: plan.premium
        })
      });

      if (res.ok) {
        toast.success(
          `🔒 Rate Locked! ${plan.company} — ${plan.plan} at Rs ${plan.premium.toLocaleString()}/yr`,
          { duration: 5000 }
        );
        setLockedPlan(plan);
        setSuccess(true);
      } else {
        const errData = await res.json().catch(() => ({}));
        toast.error(errData.error || "Failed to lock rate. Please try again.");
        setLocked(null);
      }
    } catch (err) {
      toast.error("Network error. Please check your connection and try again.");
      setLocked(null);
    } finally {
      setLoading(false);
    }
  };

  if (success && lockedPlan) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-6">
        <div className="max-w-lg w-full text-center bg-white rounded-3xl shadow-2xl p-10 border border-neutral-100">
          {/* Success animation ring */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-30" />
            <div className="relative w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center">
              <svg className="w-12 h-12 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Rate Successfully Locked
          </div>
          <h2 className="text-2xl font-black text-neutral-900 mb-2">Rate Locked In! 🎉</h2>
          <p className="text-neutral-500 mb-1">
            You've locked in <strong>{lockedPlan.company} — {lockedPlan.plan}</strong>
          </p>
          <p className="text-neutral-500 mb-2">
            at <strong className="text-brand-600">Rs {lockedPlan.premium.toLocaleString()}/yr</strong>.
          </p>
          <p className="text-neutral-400 text-sm mb-8">
            Our advisor will contact you within 24 hours to finalize your policy.
          </p>
          <div className="bg-neutral-50 rounded-2xl p-4 mb-8 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Company</span>
              <span className="font-bold text-neutral-800">{lockedPlan.company}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Plan</span>
              <span className="font-bold text-neutral-800">{lockedPlan.plan}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Annual Premium</span>
              <span className="font-bold text-brand-600">Rs {lockedPlan.premium.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Locked by</span>
              <span className="font-bold text-neutral-800">{session?.user?.name || session?.user?.email}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-6 py-3 rounded-xl bg-neutral-900 text-white font-semibold text-sm hover:opacity-90 transition-all"
            >
              Back to Home
            </Link>
            <Link
              href="/compare"
              className="px-6 py-3 rounded-xl border border-neutral-200 text-neutral-700 font-semibold text-sm hover:bg-neutral-50 transition-all"
            >
              Compare More Plans
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">

      {/* ── Auth Guard Banner ── */}
      {status === "unauthenticated" && (
        <div className="sticky top-20 z-40 bg-amber-50 border-b border-amber-200 px-4 py-3">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p className="text-sm text-amber-800 font-semibold">
                🔒 You need to be logged in to lock a rate. Browse plans freely below.
              </p>
            </div>
            <button
              onClick={() => router.push("/login?callbackUrl=/best-rate")}
              className="shrink-0 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg transition-all"
            >
              Login to Lock Rate
            </button>
          </div>
        </div>
      )}

      {/* ── Hero ── */}
      <section className="relative pt-30 pb-30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(45deg, white 1px, transparent 1px), linear-gradient(-45deg, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Bottom wave */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 bg-[var(--background)]"
          style={{ clipPath: 'ellipse(60% 100% at 50% 100%)' }}
        />
        <div className="relative max-w-3xl mx-auto px-4 text-center text-white">
          <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
            🔒 Best Rate Finder
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            Lock In Your <br />
            <span className="text-brand-400">Best Insurance Rate</span>
          </h1>
          <p className="text-neutral-300 text-lg">
            We've pre-compared the top-rated plans. Pick the one that fits you and lock in today's rate — before it changes.
          </p>
        </div>
      </section>

      {/* ── Plan Cards ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-center text-xs text-neutral-400 uppercase tracking-widest font-bold mb-8">
          Top Rated Plans Right Now
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl bg-white border-2 shadow-lg overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl ${
                plan.highlight ? 'border-brand-300 ring-2 ring-brand-100' : 'border-neutral-100'
              }`}
            >
              {/* Gradient header */}
              <div className={`bg-gradient-to-r ${plan.gradient} p-6 text-white`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{plan.icon}</span>
                  {plan.tag && (
                    <span className={`${plan.tagColor} text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider`}>
                      {plan.tag}
                    </span>
                  )}
                </div>
                <p className="text-white/80 text-xs font-semibold uppercase tracking-wider mb-1">
                  {plan.company}
                </p>
                <h3 className="text-xl font-black">{plan.plan}</h3>
                <p className="text-white/70 text-sm">{plan.type}</p>
              </div>

              {/* Details */}
              <div className="p-6 space-y-4">
                {features.map((f) => (
                  <div key={f.key} className="flex justify-between items-center text-sm">
                    <span className="text-neutral-500">{f.label}</span>
                    <span className="font-bold text-neutral-800">{f.format(plan[f.key])}</span>
                  </div>
                ))}

                <div className="pt-4 border-t border-neutral-100">
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-2xl font-black text-neutral-900">
                      Rs {plan.premium.toLocaleString()}
                    </span>
                    <span className="text-neutral-400 text-sm">/year</span>
                  </div>

                  <button
                    onClick={() => handleLock(plan.id)}
                    disabled={loading && locked === plan.id}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                      plan.highlight
                        ? 'bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-500/20 hover:shadow-lg'
                        : 'bg-neutral-900 hover:bg-neutral-700 text-white'
                    } disabled:opacity-60 cursor-pointer`}
                  >
                    {loading && locked === plan.id ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Locking in Rate…
                      </>
                    ) : status === "unauthenticated" ? (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        Login to Lock Rate
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Lock In This Rate
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Feature comparison strip ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-white rounded-2xl shadow border border-neutral-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100 flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h2 className="font-bold text-neutral-800 text-base">Quick Comparison</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50">
                  <th className="text-left px-6 py-3 text-neutral-400 text-xs uppercase tracking-widest font-bold">Plan</th>
                  {features.map((f) => (
                    <th key={f.key} className="text-center px-4 py-3 text-neutral-400 text-xs uppercase tracking-widest font-bold">
                      {f.label}
                    </th>
                  ))}
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {plans.map((plan, i) => (
                  <tr key={plan.id} className={`border-t border-neutral-50 ${i % 2 === 1 ? 'bg-neutral-50/50' : ''}`}>
                    <td className="px-6 py-4">
                      <p className="font-bold text-neutral-800">{plan.company}</p>
                      <p className="text-neutral-400 text-xs">{plan.plan}</p>
                    </td>
                    {features.map((f) => (
                      <td key={f.key} className="px-4 py-4 text-center font-semibold text-neutral-700">
                        {f.format(plan[f.key])}
                      </td>
                    ))}
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => handleLock(plan.id)}
                        disabled={loading && locked === plan.id}
                        className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-700 transition-all disabled:opacity-60 cursor-pointer flex items-center gap-1.5 mx-auto"
                      >
                        {loading && locked === plan.id ? (
                          <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                        ) : (
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        )}
                        {status === "unauthenticated" ? "Login" : loading && locked === plan.id ? "Locking…" : "Lock"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-center text-neutral-400 text-xs mt-6">
          Want to dig deeper?{' '}
          <Link href="/compare" className="text-brand-600 font-semibold hover:underline">
            Full side-by-side comparison →
          </Link>
        </p>
      </section>
    </main>
  );
}
