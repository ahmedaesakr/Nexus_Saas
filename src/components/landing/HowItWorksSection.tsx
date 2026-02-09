"use client";

import { motion } from "framer-motion";

const steps = [
    {
        number: "01",
        title: "Build",
        description: "Visually map out your workflow using our drag-and-drop builder. No coding required.",
        icon: "account_tree"
    },
    {
        number: "02",
        title: "Connect",
        description: "Integrate with your favorite tools like Slack, Gmail, Salesforce, and more.",
        icon: "hub"
    },
    {
        number: "03",
        title: "Automate",
        description: "Deploy AI agents to execute tasks 24/7 with human-level reasoning.",
        icon: "rocket_launch"
    }
];

export function HowItWorksSection() {
    return (
        <section className="py-32 relative z-10 bg-gradient-to-b from-transparent to-[#02040a]">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-12" />

            <div className="container relative">
                <div className="text-center mb-20">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 inline-block border border-primary/20">
                        How It Works
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        From Idea to Automation<br />in Minutes
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative group"
                        >
                            {/* Step Number Background */}
                            <div className="absolute top-0 right-0 text-9xl font-bold text-white/5 -z-10 group-hover:text-primary/10 transition-colors select-none">
                                {step.number}
                            </div>

                            <div className="bg-[#0c1018] border border-white/10 p-8 rounded-2xl hover:border-primary/50 transition-colors h-full flex flex-col items-center text-center relative z-10 liquid-glass">
                                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(13,89,242,0.4)] group-hover:scale-110 transition-transform duration-300">
                                    <span className="material-symbols-outlined text-white text-3xl">
                                        {step.icon}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
