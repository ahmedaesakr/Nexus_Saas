"use client";

import { motion } from "framer-motion";

export function ProgressSidebar({ step }: { step: number }) {
    const steps = [
        { id: 1, title: "Role", icon: "badge" },
        { id: 2, title: "Goals", icon: "flag" },
        { id: 3, title: "Template", icon: "description" },
        { id: 4, title: "Connect", icon: "link" },
        { id: 5, title: "Ready", icon: "check_circle" },
    ];

    return (
        <div className="w-64 bg-black/20 border-r border-white/5 p-6 flex flex-col justify-between h-full bg-[#050a14]">
            <div className="space-y-6">
                <div>
                    <h3 className="text-white font-bold text-lg mb-1">Setup Nexus</h3>
                    <p className="text-xs text-gray-500">Let&apos;s personalize your workspace.</p>
                </div>

                <div className="space-y-1 relative">
                    <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-white/5 z-0" />

                    {steps.map((s, i) => {
                        const isActive = s.id === step;
                        const isCompleted = s.id < step;

                        return (
                            <div key={s.id} className="relative z-10 flex items-center gap-3 py-2 group">
                                <motion.div
                                    initial={false}
                                    animate={{
                                        backgroundColor: isActive ? "#0d59f2" : isCompleted ? "#10b981" : "#1e293b",
                                        borderColor: isActive ? "#3b82f6" : isCompleted ? "#34d399" : "#334155",
                                    }}
                                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors shadow-lg
                                        ${isActive ? "shadow-primary/30 ring-2 ring-primary/20 ring-offset-1 ring-offset-[#0c1018]" : ""}
                                    `}
                                >
                                    <span className={`material-symbols-outlined text-[16px] ${isCompleted || isActive ? "text-white" : "text-gray-500"}`}>
                                        {isCompleted ? "check" : s.icon}
                                    </span>
                                </motion.div>

                                <span className={`text-sm font-medium transition-colors ${isActive ? "text-white" : isCompleted ? "text-gray-300" : "text-gray-600"
                                    }`}>
                                    {s.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="material-symbols-outlined text-sm">support</span>
                    Need help? <a href="#" className="text-primary hover:underline">Contact Support</a>
                </div>
            </div>
        </div>
    );
}
