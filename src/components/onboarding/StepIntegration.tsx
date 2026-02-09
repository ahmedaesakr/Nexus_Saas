"use client";

import { motion } from "framer-motion";

export function StepIntegration({
    onNext,
    onBack,
}: {
    onNext: () => void;
    onBack: () => void;
}) {
    const integrations = [
        { id: "slack", name: "Slack", icon: "forum", color: "#4A154B" },
        { id: "gmail", name: "Gmail", icon: "mail", color: "#EA4335" },
        { id: "sheets", name: "Google Sheets", icon: "table_chart", color: "#34A853" },
        { id: "salesforce", name: "Salesforce", icon: "cloud", color: "#00A1E0" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-full flex flex-col"
        >
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Connect Your Apps</h2>
                <p className="text-gray-400">Connect your favorite tools to start automating immediately.</p>
            </div>

            <div className="grid grid-cols-1 gap-3 mb-8">
                {integrations.map((app) => (
                    <div
                        key={app.id}
                        className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between group hover:bg-white/10 transition-colors"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/10" style={{ color: app.color }}>
                                <span className="material-symbols-outlined">{app.icon}</span>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-white">{app.name}</h3>
                                <p className="text-xs text-gray-400">Read/Write access</p>
                            </div>
                        </div>
                        <button className="px-3 py-1.5 text-xs font-medium text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/5">
                            Connect
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-auto flex justify-between">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                    Back
                </button>
                <button
                    onClick={onNext}
                    className="px-6 py-2 bg-white/5 text-white font-semibold rounded-xl hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)] btn-tactile"
                >
                    Skip for now
                </button>
            </div>
        </motion.div>
    );
}
