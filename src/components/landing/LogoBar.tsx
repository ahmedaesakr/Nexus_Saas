"use client";

import { motion } from "motion/react";

const LOGOS = [
  { name: "Acme Corp", icon: "◈" },
  { name: "Global Tech", icon: "◇" },
  { name: "Nebula AI", icon: "⬡" },
  { name: "Vertex", icon: "△" },
  { name: "Pulse", icon: "▽" },
  { name: "Echo", icon: "○" },
];

export function LogoBar() {
  return (
    <section className="py-20 border-t border-white/5 border-b border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center mb-10">
        <p className="text-white/40 text-sm font-medium uppercase tracking-widest font-['Instrument_Sans']">
          Trusted by 10,000+ teams worldwide
        </p>
      </div>
      
      <div className="flex overflow-hidden">
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {/* Duplicate logos for infinite scroll effect */}
          {[...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map((logo, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-2 mx-12 text-white/30 hover:text-white/60 transition-colors cursor-default"
            >
              <span className="text-2xl">{logo.icon}</span>
              <span className="text-lg font-semibold font-['Instrument_Sans'] tracking-tight">
                {logo.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
