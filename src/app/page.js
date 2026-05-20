import React from "react";
import HeroSection from "@/components/HeroSection";
import PlansSection from "@/components/PlansSection";
import CompareSection from "@/components/CompareSection";
import ChildAgeComparison from "@/components/ChildAgeComparison";
import AdsSlider from "@/components/AdsSlider";
import CtaSection from "@/components/CtaSection";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)]">
      <HeroSection />
      <AdsSlider />
      <PlansSection />
      <ChildAgeComparison />
      <CompareSection />

      <CtaSection />
    
    </div>
  );
}