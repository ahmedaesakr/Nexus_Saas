"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import Link from "next/link";

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    description: "Perfect for exploring the power of AI design.",
    features: ["1 Active Site", "Basic AI Generation", "Community Support", "Standard Hosting"],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    description: "For professionals who need more scale.",
    features: ["Unlimited Sites", "Advanced AI Engine", "Priority Support", "Custom Domains", "Clean Code Export"],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Custom solutions for large organizations.",
    features: ["All Pro Features", "Dedicated Account Manager", "SSO & SAML", "99.9% Uptime SLA", "Custom Templates"],
    cta: "Contact Sales",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto border-t border-white/5">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-['Instrument_Serif'] mb-4">
          Simple, transparent pricing
        </h2>
        <p className="text-white/60 font-['Instrument_Sans']">
          Start free. Upgrade when you're ready to share your vision with the world.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PLANS.map((plan, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`relative p-10 rounded-3xl bg-white/[0.02] border border-white/[0.05] flex flex-col ${
              plan.popular ? "border-[#3054ff]/40 shadow-[0_0_40px_rgba(48,84,255,0.1)]" : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-10 -translate-y-1/2 px-4 py-1.5 bg-[#3054ff] rounded-full">
                <p className="text-[10px] font-bold uppercase tracking-widest leading-none">Popular</p>
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2 font-['Instrument_Sans']">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-5xl font-bold font-['Instrument_Serif']">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-white/40 text-sm">/month</span>}
              </div>
              <p className="text-sm text-white/50 leading-relaxed">{plan.description}</p>
            </div>

            <div className="mb-10 flex-1">
              <ul className="space-y-4">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#3054ff] shrink-0" />
                    <span className="text-sm text-white/70">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link 
              href="#" 
              className={`w-full py-4 rounded-xl text-center font-semibold font-['Instrument_Sans'] transition-all ${
                plan.popular 
                ? "bg-white text-black hover:bg-white/90" 
                : "bg-white/5 text-white hover:bg-white/10 active:scale-[0.98]"
              }`}
            >
              {plan.cta}
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
