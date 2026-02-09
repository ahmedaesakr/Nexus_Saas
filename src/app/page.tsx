"use client";

import { motion } from "framer-motion";
import Link from "next/link";
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
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] bg-[url('/grid.svg')] opacity-[0.03]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 border-b border-white/5 backdrop-blur-md">
        <div className="container h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(13,89,242,0.5)]">
              <span className="material-symbols-outlined text-white">dataset</span>
            </div>
            Nexus Flow
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#solutions" className="hover:text-white transition-colors">Solutions</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden md:block text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2.5 bg-white text-black rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors btn-tactile"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20">
        <div className="container text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300 mb-8 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Nexus Flow 2.0 is now live
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[0.9]"
          >
            Automate Work.
            <br />
            <span className="gradient-text">Amplify Teams.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Build AI-powered workflows that run 24/7. From sales follow-ups to
            customer onboarding—let intelligent agents handle the repetitive work.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-xl text-lg font-bold hover:bg-primary-hover shadow-[0_0_40px_rgba(13,89,242,0.4)] hover:shadow-[0_0_60px_rgba(13,89,242,0.6)] transition-all btn-tactile"
            >
              Start Building Free
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white rounded-xl text-lg font-bold hover:bg-white/10 border border-white/10 backdrop-blur-sm transition-all flex items-center justify-center gap-2 group">
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">play_circle</span>
              Watch Demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid (Bento) */}
      <section id="features" className="relative z-10 py-32">
        <div className="container">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Built for the AI Era</h2>
            <p className="text-xl text-gray-400">Everything you need to orchestrate complex business processes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Visual Builder - Large Card */}
            <div className="md:col-span-2 md:row-span-2 liquid-glass p-10 relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-30 transition-opacity">
                <span className="material-symbols-outlined text-9xl">account_tree</span>
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-primary text-2xl">drag_indicator</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Visual Workflow Builder</h3>
                  <p className="text-gray-400 text-lg max-w-md">
                    Drag, drop, and connect. Create complex logic paths, loops, and conditions without writing a single line of code.
                  </p>
                </div>
                {/* Mock UI Representation */}
                <div className="w-full h-48 bg-black/40 rounded-xl border border-white/10 mt-8 relative overflow-hidden">
                  <div className="absolute top-4 left-4 right-4 h-2 bg-white/10 rounded-full" />
                  <div className="absolute top-10 left-4 w-1/3 h-20 bg-primary/20 rounded-lg border border-primary/30" />
                  <div className="absolute top-10 right-4 w-1/3 h-20 bg-indigo-500/20 rounded-lg border border-indigo-500/30" />
                  <div className="absolute top-20 left-1/2 w-full h-0.5 bg-white/10 -translate-x-1/2" />
                </div>
              </div>
            </div>

            {/* AI Agents */}
            <div className="liquid-glass p-8 relative group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-indigo-400 text-2xl">psychology</span>
              </div>
              <h3 className="text-xl font-bold mb-3">AI Agent Studio</h3>
              <p className="text-gray-400">Train custom agents with your own data and instructions to handle specific tasks.</p>
            </div>

            {/* Integrations */}
            <div className="liquid-glass p-8 relative group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-pink-400 text-2xl">hub</span>
              </div>
              <h3 className="text-xl font-bold mb-3">50+ Integrations</h3>
              <p className="text-gray-400">Connect seamlessly with Slack, Gmail, Salesforce, HubSpot, and your internal APIs.</p>
            </div>

            {/* Analytics - Wide */}
            <div className="md:col-span-3 liquid-glass p-8 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-green-400 text-2xl">monitoring</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">Real-Time ROI Analytics</h3>
                <p className="text-gray-400 text-lg">
                  Track every execution. See exactly how much time and money your automations are saving your team in real-time.
                </p>
              </div>
              <div className="flex-1 w-full h-40 bg-black/40 rounded-xl border border-white/10 flex items-end p-4 gap-2">
                <div className="w-1/5 h-[40%] bg-primary/30 rounded-t-lg" />
                <div className="w-1/5 h-[60%] bg-primary/40 rounded-t-lg" />
                <div className="w-1/5 h-[50%] bg-primary/50 rounded-t-lg" />
                <div className="w-1/5 h-[80%] bg-primary/60 rounded-t-lg" />
                <div className="w-1/5 h-[95%] bg-primary rounded-t-lg shadow-[0_0_20px_rgba(13,89,242,0.5)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

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
