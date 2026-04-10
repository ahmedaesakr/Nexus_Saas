"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import Hls from "hls.js";
import { ChevronDown, ArrowRight } from "lucide-react";

// NEW Section Imports
import { LogoBar } from "@/components/landing/LogoBar";
import { Features } from "@/components/landing/Features";
import { DemoPreview } from "@/components/landing/DemoPreview";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = "https://stream.mux.com/T6oQJQ02cQ6N01TR6iHwZkKFkbepS34dkkIc9iukgy400g.m3u8";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((e) => console.log("Auto-play prevented:", e));
      });
      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoSrc;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch((e) => console.log("Auto-play prevented:", e));
      });
    }
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#000000] text-white overflow-x-hidden font-['Instrument_Sans',sans-serif]">
      {/* Decorative Gradients */}
      <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-blue-900/20 blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-indigo-900/20 blur-[120px] mix-blend-screen pointer-events-none" />

      {/* Navbar Component */}
      <nav className="fixed top-0 w-full z-50 bg-[#000000]/50 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
          </svg>
          <span className="ml-2 text-xl font-bold tracking-tighter">Nexus</span>
        </div>

        {/* Center Section */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80 font-['Instrument_Sans']">
          <Link href="#features" className="hover:text-white flex items-center gap-1 transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="hover:text-white transition-colors">How it Works</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="#" className="hover:text-white transition-colors">Resources</Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          <Link href="#" className="hidden sm:block text-sm font-medium text-white/80 hover:text-white font-['Instrument_Sans'] transition-colors">
            Sign In
          </Link>
          <Link href="#pricing" className="bg-white text-black rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-white/90 transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section Component */}
      <main>
        <section className="relative h-screen flex flex-col items-center justify-center pt-20">
          {/* Background Video Layer */}
          <div className="absolute inset-0 z-0">
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              poster="https://images.unsplash.com/photo-1647356191320-d7a1f80ca777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRhcmslMjB0ZWNobm9sb2d5JTIwbmV1cmFsJTIwbmV0d29ya3xlbnwxfHx8fDE3Njg5NzIyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
              className="w-full h-full object-cover opacity-60"
            />
            {/* Video Overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          </div>

          {/* Content Container */}
          <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center space-y-12 px-4">
            {/* Pre-headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-['Instrument_Serif'] text-3xl sm:text-5xl lg:text-[48px] leading-[1.1] text-white"
            >
              Design at the speed of thought
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-['Instrument_Sans'] font-semibold text-6xl sm:text-8xl lg:text-[136px] leading-[0.9] tracking-tighter bg-gradient-to-b from-white via-white to-[#b4c0ff] bg-clip-text text-transparent"
            >
              Build Faster
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-['Instrument_Sans'] text-lg sm:text-[20px] leading-[1.65] text-white opacity-70 max-w-xl"
            >
              Create fully functional, SEO-optimized websites in seconds with our advanced AI engine.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-6 items-center"
            >
              <Link href="#pricing" className="group flex items-center bg-white rounded-full pl-6 pr-2 py-2 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300">
                <span className="font-medium text-lg font-['Instrument_Sans'] text-[#0a0400] mr-4">
                  Start Building Free
                </span>
                <div className="w-[40px] h-[40px] rounded-full bg-[#3054ff] group-hover:bg-[#2040e0] flex items-center justify-center transition-colors">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
              </Link>

              <Link href="#" className="group flex items-center gap-2 text-white/70 hover:text-white backdrop-blur-sm hover:bg-white/5 px-4 py-2 rounded-lg transition-all duration-300">
                See Examples
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* PAGE SECTIONS */}
        <LogoBar />
        
        <div id="features">
          <Features />
        </div>
        
        <DemoPreview />
        
        <div id="how-it-works">
          <HowItWorks />
        </div>
        
        <Testimonials />
        
        <div id="pricing">
          <Pricing />
        </div>
        
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
