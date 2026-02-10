"use client";

import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { BentoFeatureGrid } from "@/components/landing/BentoFeatureGrid";
import { SolutionsSection } from "@/components/landing/SolutionsSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { EnhancedFooter } from "@/components/landing/EnhancedFooter";
import { FinalCTA } from "@/components/landing/FinalCTA";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050a14] text-white overflow-hidden selection:bg-primary selection:text-white font-sans">
      <Navbar />
      <HeroSection />
      <BentoFeatureGrid />
      <SolutionsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <FinalCTA />
      <EnhancedFooter />
    </div>
  );
}
