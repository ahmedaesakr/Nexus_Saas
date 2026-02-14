"use client";

import { motion } from "framer-motion";

export function StepCompletion({
    userData,
    onComplete,
}: {
    userData: { role: string; goals: string[]; templateId: string };
    onComplete: () => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center h-full text-center"
        >
            <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mb-8 animate-bounce-slow">
                <span className="material-symbols-outlined text-green-400 text-5xl">check_circle</span>
            </div>

            <h2 className="text-3xl font-bold text-white mb-4">You&apos;re all set!</h2>
            <p className="text-gray-400 max-w-md mb-8">
                We&apos;ve configured your workspace for <strong>{userData.role}</strong>.
                {userData.templateId !== "scratch" && " Your started template is ready."}
            </p>

            <div className="bg-[#0c1018] p-6 rounded-xl border border-white/10 w-full max-w-sm mb-8 text-left">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Your Setup</h3>
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-gray-400 text-sm">person</span>
                        <span className="text-sm text-white capitalize">{userData.role}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-gray-400 text-sm">flag</span>
                        <span className="text-sm text-white">{userData.goals.length} Goals Selected</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-gray-400 text-sm">layers</span>
                        <span className="text-sm text-white capitalize">{userData.templateId.replace('_', ' ')} Template</span>
                    </div>
                </div>
            </div>

            <button
                onClick={onComplete}
                className="px-8 py-3 bg-primary text-white rounded-xl text-lg font-bold hover:bg-primary-hover shadow-[0_0_20px_rgba(13,89,242,0.4)] transition-all btn-tactile w-full max-w-xs"
            >
                Go to Dashboard
            </button>
        </motion.div>
    );
}
