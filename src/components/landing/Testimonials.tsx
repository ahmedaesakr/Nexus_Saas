"use client";

import { motion } from "motion/react";

const TESTIMONIALS = [
  {
    name: "Alex Rivera",
    role: "Founding Designer",
    company: "Lumina",
    quote: "Nexus has completely transformed our design workflow. We ship interfaces in hours that used to take days of back-and-forth.",
  },
  {
    name: "Sarah Chen",
    role: "Solo Founder",
    company: "Velo",
    quote: "As a non-designer, Nexus is my superpower. I can build premium-feeling sites without ever touching a dedicated design tool.",
  },
  {
    name: "Marcus Jones",
    role: "Product Lead",
    company: "Sync",
    quote: "The speed of generation is mind-blowing. It's not just boilerplate—it's high-fidelity design that actually looks good.",
  },
  {
    name: "Elena Petrova",
    role: "Creative Director",
    company: "Studio P",
    quote: "Finally, an AI that understands typography and whitespace. The output feels intentional and premium, not generic.",
  },
  {
    name: "David Smith",
    role: "Full-stack Developer",
    company: "Launch",
    quote: "I use Nexus for all my landing pages. The SEO optimization and clean code export save me so much time.",
  },
  {
    name: "Justin Wu",
    role: "Marketing Manager",
    company: "Fast",
    quote: "The best ROI we've seen on a tool. Our conversion rates improved because our landing pages look significantly more professional.",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-['Instrument_Serif'] mb-4">
          Loved by builders
        </h2>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {TESTIMONIALS.map((t, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="break-inside-avoid p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/10 transition-colors"
          >
            <p className="text-white/80 font-['Instrument_Sans'] italic leading-relaxed mb-6">
              " {t.quote} "
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3054ff] to-[#b4c0ff]" />
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-[10px] text-white/40 uppercase tracking-widest">
                  {t.role} @ {t.company}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
