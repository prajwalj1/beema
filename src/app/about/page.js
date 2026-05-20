import React from "react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "About Us | Beema Dukaan",
  description: "Learn about Beema Dukaan — Nepal's trusted digital insurance marketplace.",
};

const values = [
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>,
    color: "bg-emerald-100 text-emerald-600",
    title: "Trust First",
    desc: "Every policy, every claim, every interaction is rooted in transparency. We say what we mean and do what we say.",
  },
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>,
    color: "bg-blue-100 text-blue-600",
    title: "People-Centric",
    desc: "We design every product and feature around real Nepali families — their challenges, their goals, their futures.",
  },
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>,
    color: "bg-amber-100 text-amber-600",
    title: "Digital First",
    desc: "From onboarding to claims, we eliminate paperwork and bring your entire insurance life into one seamless platform.",
  },
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/></svg>,
    color: "bg-violet-100 text-violet-600",
    title: "Inclusive Access",
    desc: "Insurance should not be a privilege. We are committed to making quality coverage affordable and accessible across Nepal.",
  },
];

const milestones = [
  { year: "2020", title: "Founded", desc: "Beema Dukaan was born from a vision to digitise insurance for Nepal." },
  { year: "2021", title: "First 1,000 Policies", desc: "Crossed our first major milestone within 12 months of launch." },
  { year: "2022", title: "Promoter Network", desc: "Launched the affiliate promoter model, empowering local agents nationwide." },
  { year: "2023", title: "Health Coverage", desc: "Expanded product suite to include comprehensive health insurance plans." },
  { year: "2024", title: "10,000+ Families", desc: "Now serving over 10,000 Nepali families with active coverage." },
  { year: "2025", title: "Award Winning", desc: "Recognised as Nepal's Best Insurtech Platform by FinTech Nepal Awards." },
];

const team = [
  {
    name: "Aarav Sharma",
    role: "Chief Executive Officer",
    initials: "AS",
    gradient: "from-brand-500 to-emerald-500",
    image: "/images/ceo.jpg",
    linkedin: "#",
    bio: "10+ years in fintech & insurance leadership across South Asia.",
  },
  {
    name: "Jems Thapa",
    role: "Head of Promoter",
    initials: "JT",
    gradient: "from-violet-500 to-purple-600",
    image: "/images/ceo.jpg",
    linkedin: "#",
    bio: "Product strategist focused on user-first digital financial services.",
  },
  {
    name: "Bikash Adhikari",
    role: "Branch Mangaer",
    initials: "BA",
    gradient: "from-blue-500 to-indigo-600",
    image: "/images/ceo.jpg",
    linkedin: "#",
    bio: "Full-stack architect with deep expertise in secure cloud systems.",
  },
  {
    name: "Simon Sitoula",
    role: "Head of Claims",
    initials: "SK",
    gradient: "from-rose-500 to-pink-600",
    image: "/images/ceo.jpg",
    linkedin: "#",
    bio: "Dedicated to making the claims process fast, fair, and transparent.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FFFAF0]">
      {/* Hero */}
      <section className="relative pt-32 pb-30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F1C3F] via-[#132150] to-[#070F21]" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(ellipse at 30% 50%, #22c55e 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #3b82f6 0%, transparent 50%)" }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#FFFAF0]" style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }} />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
            Our Story
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">
            Redefining Insurance<br />
            <span className="text-emerald-400">for Nepal</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            We started with a simple belief: every Nepali deserves affordable, transparent, and accessible insurance — without the paperwork, without the confusion.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "10K+", label: "Families Protected" },
            { value: "4", label: "Insurance Categories" },
            { value: "NPR 2Cr+", label: "Claims Settled" },
            { value: "500+", label: "Promoter Partners" },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 text-center hover:shadow-md transition-shadow">
              <p className="text-3xl font-black text-brand-600">{s.value}</p>
              <p className="text-xs text-neutral-400 font-semibold mt-1 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs text-brand-600 font-black uppercase tracking-widest">Our Mission</span>
            <h2 className="text-3xl md:text-4xl font-black text-neutral-900 mt-3 mb-5 leading-tight">
              Making Protection<br />a Right, Not a Privilege
            </h2>
            <p className="text-neutral-500 leading-relaxed mb-5">
              Beema Dukaan was founded on the belief that complex insurance products — buried under mountains of jargon — leave the people who need them most completely unprotected.
            </p>
            <p className="text-neutral-500 leading-relaxed mb-8">
              By building a digital-first platform with transparent pricing, straightforward onboarding, and a network of trusted local promoters, we are closing the insurance gap across Nepal — from Kathmandu to the most remote districts.
            </p>
            <Link href="/register" className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg">
              Get Protected Today
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {values.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl border border-neutral-100 p-6 hover:shadow-md transition-shadow hover:-translate-y-0.5 duration-200">
                <div className={`w-11 h-11 rounded-xl ${v.color} flex items-center justify-center mb-4`}>{v.icon}</div>
                <h3 className="text-sm font-black text-neutral-900 mb-2">{v.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white border-y border-neutral-100 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs text-brand-600 font-black uppercase tracking-widest">Our Journey</span>
            <h2 className="text-3xl font-black text-neutral-900 mt-2">From Idea to Impact</h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-neutral-200 -translate-x-1/2 hidden md:block" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <div key={i} className={`relative flex items-center gap-8 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
                    <div className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow inline-block w-full">
                      <span className="inline-block px-3 py-1 bg-brand-50 text-brand-700 text-xs font-black rounded-full uppercase tracking-wider mb-3">{m.year}</span>
                      <h3 className="text-base font-black text-neutral-900">{m.title}</h3>
                      <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-brand-600 rounded-full items-center justify-center shadow-lg z-10">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <span className="text-xs text-brand-600 font-black uppercase tracking-widest">The People Behind It</span>
          <h2 className="text-3xl font-black text-neutral-900 mt-2">Our Leadership Team</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <div key={i} className="group cursor-pointer">
              {/* Image Card */}
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-md group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 mb-4">
                {/* Fallback gradient avatar shown when image fails or while loading */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-4xl font-black select-none`}
                  aria-hidden="true"
                >
                  {member.initials}
                </div>



{/* Actual team photo — replace src path with real image in /public/images/team/ */}
<Image
  src={member.image}
  alt={member.name}
  fill
  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
/>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                  <p className="text-white text-xs font-semibold leading-snug">{member.bio}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold text-white/80 hover:text-white transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>

                {/* Glowing ring on hover */}
                <div className={`absolute inset-0 rounded-3xl ring-0 group-hover:ring-4 ring-offset-2 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-30 transition-all duration-300 pointer-events-none`} />
              </div>

              <p className="font-black text-neutral-900 text-sm text-center group-hover:text-brand-600 transition-colors">{member.name}</p>
              <p className="text-xs text-neutral-400 mt-0.5 text-center">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gradient-to-r from-[#0F1C3F] to-brand-700 rounded-3xl p-10 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl -translate-y-20 translate-x-20" />
          <h2 className="text-2xl md:text-3xl font-black mb-3">Ready to join 10,000+ protected families?</h2>
          <p className="text-slate-300 mb-8 text-sm max-w-xl mx-auto">Start your journey towards financial security today. It takes less than 3 minutes to get covered.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-black text-sm transition-all shadow-lg">
              Create Free Account
            </Link>
            <Link href="/contact" className="px-8 py-3.5 bg-white/10 border border-white/20 text-white rounded-xl font-bold text-sm hover:bg-white/20 transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
