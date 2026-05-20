"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ads = [
  {
    id: 1,
    title: "Exclusive Life Cover Deals",
    subtitle: "Protect Your Family's Future",
    description: "Get up to 20% discount on first year premiums for select term life insurance policies available only through Beema Dukaan.",
    bgColor: "bg-gradient-to-r from-brand-600 to-brand-800",
    image: "/images/register.png",
  },
  {
    id: 2,
    title: "Top Child Endowment Plans",
    subtitle: "Secure Their Education",
    description: "Find high-return child policies with premium waiver benefits. Secure your child's higher education today.",
    bgColor: "bg-gradient-to-r from-emerald-500 to-teal-700",
    image: "/images/register.png",
  },
  {
    id: 3,
    title: "Compare & Save Big",
    subtitle: "Stop Overpaying for Insurance",
    description: "Our users save up to Rs 15,000 annually simply by comparing premiums across all 14 life insurance companies in Nepal.",
    bgColor: "bg-gradient-to-r from-amber-500 to-orange-600",
    image: "/images/register.png",
  }
];

export default function AdsSlider() {
  const [currentAd, setCurrentAd] = useState(0);
  const { data: session } = useSession();
  const router = useRouter();

  const handleClaimOffer = () => {
    if (session) {
      // Assuming a customer/user who claims an offer goes to their dashboard
      router.push("/dashboard/customer");
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAd}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`absolute inset-0 ${ads[currentAd].bgColor} flex items-center justify-between p-8 md:p-16`}
            >
              {/* Decorative shapes */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
              
              <div className="relative z-10 max-w-2xl text-white">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold tracking-wider uppercase mb-4">
                  {ads[currentAd].subtitle}
                </span>
                <h3 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
                  {ads[currentAd].title}
                </h3>
                <p className="text-base md:text-lg text-white/90 mb-8 max-w-xl leading-relaxed">
                  {ads[currentAd].description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={handleClaimOffer}
                    className="px-8 py-3.5 bg-white text-neutral-900 font-bold rounded-xl hover:bg-neutral-100 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
                  >
                    Claim Offer Now
                  </button>
                  <Link 
                    href="/insurance-plans" 
                    prefetch={false}
                    className="px-8 py-3.5 bg-black/20 text-white font-bold rounded-xl hover:bg-black/30 backdrop-blur-sm transition-colors border border-white/20 hover:border-white/40 shadow-lg transform hover:-translate-y-0.5 duration-200 flex items-center"
                  >
                    Explore Plans
                  </Link>
                </div>
              </div>

              {/* Dynamic Ad Image */}
              <div className="hidden lg:flex relative z-10 w-1/3 h-full items-center justify-center">
                 <div className="relative w-72 h-72 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <Image 
                      src={ads[currentAd].image} 
                      alt={ads[currentAd].title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-contain drop-shadow-2xl"
                      priority
                    />
                 </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Ad Slider Controls */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
            {ads.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentAd(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentAd ? "bg-white w-8" : "bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`View Ad ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}