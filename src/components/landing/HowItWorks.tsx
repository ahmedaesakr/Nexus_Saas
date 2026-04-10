"use client";

import { motion } from "motion/react";
import { MessageSquare, Zap, Rocket } from "lucide-react";

const STEPS = [
  {
    number: "01",
    title: "Describe",
    description: "Tell the AI about your brand, mission, and the vision for your site.",
    icon: <MessageSquare className="w-8 h-8" />,
  },
  {
    number: "02",
    title: "Generate",
    description: "Watch your website come to life in seconds with custom layouts and content.",
    icon: <Zap className="w-8 h-8" />,
  },
  {
    number: "03",
    title: "Launch",
    description: "Review your site, connect your domain, and go live with one click.",
    icon: <Rocket className="w-8 h-8" />,
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto border-t border-white/5">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-['Instrument_Serif'] mb-4">
          From idea to live site in minutes
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        {STEPS.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className="relative flex flex-col items-center text-center group"
          >
            <span className="absolute -top-12 text-8xl font-['Instrument_Serif'] text-white/[0.03] pointer-events-none group-hover:text-white/[0.05] transition-colors">
              {step.number}
            </span>
            
            <div className="mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-[#3054ff] group-hover:bg-[#3054ff]/10 transition-colors z-10">
              {step.icon}
            </div>
            
            <h3 className="text-2xl font-semibold mb-3 font-['Instrument_Sans'] tracking-tight">
              {step.title}
            </h3>
            <p className="text-white/60 font-['Instrument_Sans'] leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
        
        {/* Decorative Line (Desktop) */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent -z-10 hidden md:block" />
      </div>
    </section>
  );
}
