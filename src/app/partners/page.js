import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Our Partners | Beema Dukaan",
  description: "Meet the trusted insurance partners of Beema Dukaan.",
};

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-[#FFFAF0] pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-neutral-100 relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-100 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-50"></div>
          
          <h1 className="text-3xl md:text-5xl font-black text-neutral-900 mb-6 relative z-10">
            Our Trusted Partners
          </h1>
          <p className="text-lg text-neutral-600 mb-12 max-w-2xl mx-auto relative z-10 leading-relaxed">
            We collaborate with the most reputable and reliable insurance companies in Nepal to bring you the best plans, seamless claim settlements, and unparalleled customer service.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
            {/* Partner placeholder 1 */}
            <div className="p-8 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 shadow-sm hover:shadow-md">
              <span className="font-black text-neutral-400 text-xl">Nepal Life</span>
            </div>
            {/* Partner placeholder 2 */}
            <div className="p-8 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 shadow-sm hover:shadow-md">
              <span className="font-black text-neutral-400 text-xl">LIC Nepal</span>
            </div>
            {/* Partner placeholder 3 */}
            <div className="p-8 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 shadow-sm hover:shadow-md">
              <span className="font-black text-neutral-400 text-xl">National Life</span>
            </div>
            {/* Partner placeholder 4 */}
            <div className="p-8 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 shadow-sm hover:shadow-md">
              <span className="font-black text-neutral-400 text-xl">Asian Life</span>
            </div>
            {/* Partner placeholder 5 */}
            <div className="p-8 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 shadow-sm hover:shadow-md">
              <span className="font-black text-neutral-400 text-xl">SuryaJyoti</span>
            </div>
            {/* Partner placeholder 6 */}
            <div className="p-8 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 shadow-sm hover:shadow-md">
              <span className="font-black text-neutral-400 text-xl">Shikhar Ins.</span>
            </div>
            {/* Partner placeholder 7 */}
            <div className="p-8 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 shadow-sm hover:shadow-md">
              <span className="font-black text-neutral-400 text-xl">Sagarmatha</span>
            </div>
            {/* Partner placeholder 8 */}
            <div className="p-8 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 shadow-sm hover:shadow-md">
              <span className="font-black text-neutral-400 text-xl">Neco Ins.</span>
            </div>
          </div>

          <div className="mt-16 relative z-10">
            <h3 className="text-xl font-bold text-neutral-900 mb-4">Want to partner with us?</h3>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl font-bold transition-all shadow-md">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
