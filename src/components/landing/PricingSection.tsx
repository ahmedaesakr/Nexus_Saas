"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const plans = [
    {
        name: "Free",
        price: "$0",
        description: "Perfect for hobbyists and testing.",
        features: [
            "3 Active Workflows",
            "100 Executions / month",
            "1 Team Member",
            "Community Support",
            "Standard Integrations"
        ],
        cta: "Start for Free",
        href: "/signup",
        popular: false
    },
    {
        name: "Starter",
        price: "$29",
        period: "/mo",
        description: "For individuals and small teams.",
        features: [
            "10 Active Workflows",
            "1,000 Executions / month",
            "5 Team Members",
            "Email Support",
            "Premium Integrations",
            "30-day History"
        ],
        cta: "Start Free Trial",
        href: "/signup?plan=starter",
        popular: false
    },
    {
        name: "Pro",
        price: "$99",
        period: "/mo",
        description: "For growing businesses.",
        features: [
            "Unlimited Workflows",
            "10,000 Executions / month",
            "25 Team Members",
            "Priority Support",
            "Advanced Analytics",
            "Unlimited History",
            "API Access"
        ],
        cta: "Start Free Trial",
        href: "/signup?plan=pro",
        popular: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "For large organizations.",
        features: [
            "Unlimited Everything",
            "Custom Execution Limits",
            "Unlimited Team Members",
            "Dedicated Success Manager",
            "SSO & Audit Logs",
            "On-Premise Deployment",
            "SLA Guarantee"
        ],
        cta: "Contact Sales",
        href: "/contact",
        popular: false
    }
];

export function PricingSection() {
    const [isYearly, setIsYearly] = useState(false);

    return (
        <section id="pricing" className="py-32 relative z-10">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Transparent Pricing
                    </h2>
                    <p className="text-xl text-gray-400 mb-8">
                        Start small and scale as you automate more.
                    </p>

                    {/* Toggle */}
                    <div className="flex items-center justify-center gap-4">
                        <span className={`text-sm font-medium ${!isYearly ? 'text-white' : 'text-gray-500'}`}>Monthly</span>
                        <button
                            onClick={() => setIsYearly(!isYearly)}
                            className="w-14 h-7 bg-white/10 rounded-full relative transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#050a14]"
                        >
                            <div className={`w-5 h-5 rounded-full bg-primary absolute top-1 transition-all ${isYearly ? 'left-8' : 'left-1'}`} />
                        </button>
                        <span className={`text-sm font-medium ${isYearly ? 'text-white' : 'text-gray-500'}`}>
                            Yearly <span className="text-primary text-xs ml-1">(Save 20%)</span>
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative p-8 rounded-2xl border flex flex-col ${plan.popular
                                ? 'bg-[#0c1018] border-primary shadow-[0_0_30px_rgba(13,89,242,0.15)] scale-105 z-10'
                                : 'bg-[#0c1018]/50 border-white/10 hover:border-white/20'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                    MOST POPULAR
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-white mb-2">{plan.name}</h3>
                                <div className="flex items-end gap-1 mb-2">
                                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                                    {plan.period && <span className="text-gray-500 mb-1">{plan.period}</span>}
                                </div>
                                <p className="text-sm text-gray-400">{plan.description}</p>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                        <span className={`material-symbols-outlined text-[18px] ${plan.popular ? 'text-primary' : 'text-gray-500'}`}>
                                            check_circle
                                        </span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={plan.href}
                                className={`w-full py-3 rounded-xl text-sm font-bold transition-all text-center ${plan.popular
                                    ? 'bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/25 hover:shadow-primary/40'
                                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                                    }`}
                            >
                                {plan.cta}
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
