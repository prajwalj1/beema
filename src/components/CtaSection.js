import React from "react";
import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-brand-600 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-20"></div>
      <div className="max-w-4xl mx-auto px-4 text-center space-y-8 relative z-10">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">Secure your future. Today.</h2>
        <p className="text-lg md:text-xl text-brand-100 max-w-2xl mx-auto leading-relaxed">
          Get personalized and quick recommendations completely free. Experience insurance booking like never before in Nepal.
        </p>
        <Link href="/dashboard/customer" className="inline-block px-8 py-4 rounded-full bg-white text-brand-600 font-bold text-base hover:bg-brand-50 transition-colors shadow-2xl hover:shadow-white/10 transform hover:-translate-y-1 duration-300">
          Buy New Policies
        </Link>
      </div>
    </section>
  );
}
