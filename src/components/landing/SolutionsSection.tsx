"use client";

import { motion } from "framer-motion";

const solutions = [
    {
        id: "sales",
        icon: "attach_money",
        title: "Sales & Revenue",
        color: "text-green-400",
        bg: "bg-green-500/10",
        border: "border-green-500/20",
        features: [
            "Auto-qualify inbound leads",
            "Schedule meetings 24/7",
            "Personalized follow-up sequences"
        ]
    },
    {
        id: "marketing",
        icon: "campaign",
        title: "Marketing & Growth",
        color: "text-pink-400",
        bg: "bg-pink-500/10",
        border: "border-pink-500/20",
        features: [
            "Content repurposing pipelines",
            "Social media monitoring",
            "Campaign performance tracking"
        ]
    },
    {
        id: "support",
        icon: "support_agent",
        title: "Customer Support",
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        features: [
            "Instant ticket triage",
            "FAQ auto-responses",
            "Escalation to human agents"
        ]
    },
    {
        id: "operations",
        icon: "settings_suggest",
        title: "IT & Operations",
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        features: [
            "Employee onboarding flows",
            "Data sync between tools",
            "Automated reporting"
        ]
    }
];

export function SolutionsSection() {
    return (
        <section id="solutions" className="py-24 relative z-10">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Powering Every Department
                    </h2>
                    <p className="text-xl text-gray-400">
                        Tailored AI agents that understand the specific needs of your teams.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {solutions.map((solution, index) => (
                        <motion.div
                            key={solution.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-6 rounded-2xl bg-[#0c1018] border ${solution.border} hover:bg-white/5 transition-all group liquid-glass`}
                        >
                            <div className={`w-12 h-12 rounded-lg ${solution.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <span className={`material-symbols-outlined ${solution.color} text-2xl`}>
                                    {solution.icon}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold mb-4">{solution.title}</h3>
                            <ul className="space-y-3">
                                {solution.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                                        <span className={`material-symbols-outlined text-[18px] ${solution.color} mt-0.5`}>
                                            check_circle
                                        </span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 pt-6 border-t border-white/5">
                                <button className="flex items-center gap-2 text-sm font-medium text-white hover:text-primary transition-colors group/btn">
                                    Explore use cases
                                    <span className="material-symbols-outlined text-lg group-hover/btn:translate-x-1 transition-transform">
                                        arrow_forward
                                    </span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
