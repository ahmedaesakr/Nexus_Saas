"use client";

import { motion } from "motion/react";
import { Sparkles, BarChart3, Smartphone, Library, Rocket, Globe } from "lucide-react";

const FEATURES = [
  {
    title: "AI-Powered Design",
    description: "Generate stunning website layouts in seconds with our advanced neural engine.",
    icon: <Sparkles className="w-6 h-6 text-[#3054ff]" />,
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "SEO Optimized",
    description: "Built-in SEO best practices for every page.",
    icon: <BarChart3 className="w-6 h-6 text-[#3054ff]" />,
    className: "md:col-span-1",
  },
  {
    title: "Responsive",
    description: "Pixel-perfect on every device size.",
    icon: <Smartphone className="w-6 h-6 text-[#3054ff]" />,
    className: "md:col-span-1",
  },
  {
    title: "UI Library",
    description: "Access a library of premium components.",
    icon: <Library className="w-6 h-6 text-[#3054ff]" />,
    className: "md:col-span-1",
  },
  {
    title: "One-Click Deploy",
    description: "Go live instantly on our global edge network.",
    icon: <Rocket className="w-6 h-6 text-[#3054ff]" />,
    className: "md:col-span-1",
  },
  {
    title: "Custom Domains",
    description: "Connect your own domain with free SSL.",
    icon: <Globe className="w-6 h-6 text-[#3054ff]" />,
    className: "md:col-span-1",
  },
];

export function Features() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-['Instrument_Serif'] mb-4"
        >
          Everything you need
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/60 font-['Instrument_Sans'] max-w-xl mx-auto"
        >
          A complete suite of design and deployment tools to transform your ideas into reality.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {FEATURES.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`p-8 bg-white/[0.03] border border-white/[0.06] rounded-2xl hover:border-white/10 transition-all group ${feature.className}`}
          >
            <div className="mb-4 p-3 bg-white/[0.05] rounded-xl w-fit group-hover:bg-[#3054ff]/10 transition-colors">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 font-['Instrument_Sans']">{feature.title}</h3>
            <p className="text-white/60 font-['Instrument_Sans'] leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
