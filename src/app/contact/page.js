"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

const faqs = [
  {
    q: "How do I file a claim?",
    a: "Log into your dashboard, navigate to 'Claims', and click 'File New Claim'. Our team will review and respond within 3 business days.",
  },
  {
    q: "Can I change my insurance plan?",
    a: "Yes. You can upgrade or switch plans at any time from your dashboard or by contacting our support team.",
  },
  {
    q: "Is my personal data secure?",
    a: "Absolutely. We use bank-grade AES-256 encryption for all stored data and never share your information with third parties without consent.",
  },
  {
    q: "How does the promoter referral program work?",
    a: "Register as a promoter, share your unique referral link, and earn commission for every successful policy subscription through your link.",
  },
];

const offices = [
  {
    city: "Jhapa",
    address: "Dhulabari , Birtamode, Jhapa 3600",
    phone: "+977-0230562674",
    hours: "Sun–Fri: 9AM – 6PM",
    type: "Head Office",
    gradient: "from-brand-600 to-emerald-600",
  },
  {
    city: "Biratnagar",
    address: "Bargachi , Biratnagar, Morang 566136",
    phone: "+977-021-456789",
    hours: "Sun–Fri: 9AM – 5PM",
    type: "Regional Office",
    gradient: "from-blue-600 to-indigo-600",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setForm({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
    setSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-[#FFFAF0]">
      {/* Hero */}
      <section className="relative pt-32 pb-30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-600 to-emerald-700" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 25% 60%, white 1px, transparent 1px), radial-gradient(circle at 75% 30%, white 1px, transparent 1px)", backgroundSize: "50px 50px" }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#FFFAF0]" style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }} />
        <div className="relative max-w-3xl mx-auto px-4 text-center text-white">
          <span className="inline-block px-4 py-1.5 bg-white/15 border border-white/20 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
            We&apos;re Here to Help
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Get in Touch<br />
            <span className="text-emerald-200">Anytime, Anywhere</span>
          </h1>
          <p className="text-emerald-100 text-lg max-w-xl mx-auto leading-relaxed">
            Questions about a policy? Need help with a claim? Our dedicated support team responds within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-neutral-100 shadow-xl p-8">
            <h2 className="text-2xl font-black text-neutral-900 mb-2">Send us a Message</h2>
            <p className="text-sm text-neutral-400 mb-8">Fill in the form and we&apos;ll respond within 24 hours.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] text-neutral-400 uppercase tracking-widest font-black mb-1.5">Full Name *</label>
                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Aarav Sharma"
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-neutral-400 uppercase tracking-widest font-black mb-1.5">Email Address *</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] text-neutral-400 uppercase tracking-widest font-black mb-1.5">Phone Number</label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="98XXXXXXXX"
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-neutral-400 uppercase tracking-widest font-black mb-1.5">Subject</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-semibold"
                  >
                    <option>General Inquiry</option>
                    <option>Policy Questions</option>
                    <option>Claim Support</option>
                    <option>Promoter Program</option>
                    <option>Technical Issue</option>
                    <option>Feedback</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-neutral-400 uppercase tracking-widest font-black mb-1.5">Your Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us how we can help you..."
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-black text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-60"
              >
                {submitting ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Send Message
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Quick Contact */}
            <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-6">
              <h3 className="text-base font-black text-neutral-900 mb-5">Quick Contact</h3>
              <div className="space-y-4">
                {[
                  { icon: "📞", label: "Call Us", value: "+977-01-4567890", sub: "Sun–Fri, 9AM–6PM" },
                  { icon: "📧", label: "Email", value: "support@beemadukaan.com", sub: "Response within 24h" },
                  { icon: "💬", label: "WhatsApp", value: "+977-9800000000", sub: "Quick queries" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-neutral-50 rounded-2xl hover:bg-brand-50 transition-colors group">
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-bold">{item.label}</p>
                      <p className="text-sm font-bold text-neutral-800 group-hover:text-brand-600 transition-colors">{item.value}</p>
                      <p className="text-[11px] text-neutral-400">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Office Locations */}
            {offices.map((office, i) => (
              <div key={i} className={`bg-gradient-to-br ${office.gradient} rounded-3xl p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-black">{office.city}</h3>
                  <span className="text-[10px] font-bold bg-white/20 px-3 py-1 rounded-full uppercase tracking-wider">{office.type}</span>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p className="flex items-start gap-2">
                    <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    {office.address}
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    {office.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    {office.hours}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-10">
          <span className="text-xs text-brand-600 font-black uppercase tracking-widest">FAQ</span>
          <h2 className="text-3xl font-black text-neutral-900 mt-2">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-neutral-50 transition-colors"
              >
                <span className="text-sm font-bold text-neutral-900 pr-4">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5">
                  <p className="text-sm text-neutral-500 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-sm text-neutral-400 mb-4">Still have questions?</p>
          <Link href="mailto:support@beemadukaan.com" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold text-sm transition-all shadow-md">
            Email Our Support Team
          </Link>
        </div>
      </section>
    </main>
  );
}
