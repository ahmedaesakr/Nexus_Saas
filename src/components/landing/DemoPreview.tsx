"use client";

import { motion } from "motion/react";
import Image from "next/image";

export function DemoPreview() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#3054ff]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative">
          {/* Browser Chrome */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl overflow-hidden"
          >
            <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
              </div>
              <div className="mx-auto bg-white/5 rounded-md h-5 w-64" />
            </div>
            
            <div className="aspect-video relative">
              <Image 
                src="/images/demo-preview.png" 
                alt="Website Preview" 
                fill 
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Floating UI Elements */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 md:right-[-40px] p-4 bg-white/[0.05] border border-white/10 backdrop-blur-xl rounded-2xl shadow-xl hidden sm:block"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#3054ff] flex items-center justify-center text-white">✨</div>
              <div>
                <p className="text-xs font-semibold">AI Assistant</p>
                <p className="text-[10px] text-white/50">Generated in 4.2s</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 md:left-[-40px] p-4 bg-white/[0.05] border border-white/10 backdrop-blur-xl rounded-2xl shadow-xl hidden sm:block"
          >
            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-semibold text-white/50">COLOR PALETTE</p>
              <div className="flex gap-1.5">
                <div className="w-4 h-4 rounded-sm bg-[#3054ff]" />
                <div className="w-4 h-4 rounded-sm bg-[#b4c0ff]" />
                <div className="w-4 h-4 rounded-sm bg-white" />
                <div className="w-4 h-4 rounded-sm bg-black border border-white/20" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
