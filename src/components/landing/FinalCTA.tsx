"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="py-32 px-6 border-t border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-t from-[#3054ff]/10 to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-['Instrument_Serif'] mb-8 tracking-tight"
        >
          Ready to build something beautiful?
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-white/60 font-['Instrument_Sans'] mb-12 max-w-2xl mx-auto"
        >
          Join thousands of designers, developers, and founders who are using Nexus to ship fast and premium websites.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-6 items-center justify-center"
        >
          <Link href="#" className="group flex items-center bg-white rounded-full pl-6 pr-2 py-2 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300">
            <span className="font-medium text-lg font-['Instrument_Sans'] text-[#0a0400] mr-4">
              Start Building Free
            </span>
            <div className="w-[40px] h-[40px] rounded-full bg-[#3054ff] group-hover:bg-[#2040e0] flex items-center justify-center transition-colors">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </Link>

          <Link href="#" className="group flex items-center gap-2 text-white/70 hover:text-white backdrop-blur-sm hover:bg-white/5 px-6 py-3 rounded-full transition-all duration-300">
            See Examples
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
