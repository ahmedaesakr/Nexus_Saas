"use client";

import { motion } from "framer-motion";

const roles = [
    { id: "sales", label: "Sales & Revenue", icon: "attach_money" },
    { id: "marketing", label: "Marketing", icon: "campaign" },
    { id: "support", label: "Customer Support", icon: "support_agent" },
    { id: "it", label: "IT & Operations", icon: "settings_suggest" },
    { id: "other", label: "Other", icon: "person" }
];

export function StepRoleSelection({
    value,
    onChange,
    onNext
}: {
    value: string;
    onChange: (role: string) => void;
    onNext: () => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col h-full"
        >
            <h2 className="text-2xl font-bold text-white mb-2">Welcome to Nexus Flow! 👋</h2>
            <p className="text-gray-400 mb-8">Let&apos;s personalize your workspace. What best describes your role?</p>

            <div className="grid grid-cols-2 gap-4 flex-1">
                {roles.map((role) => (
                    <button
                        key={role.id}
                        onClick={() => onChange(role.id)}
                        className={`p-4 rounded-xl border transition-all text-left flex items-center gap-3 ${value === role.id
                                ? "bg-primary/10 border-primary text-white shadow-[0_0_15px_rgba(13,89,242,0.2)]"
                                : "bg-white/5 border-white/10 hover:border-white/20 text-gray-300 hover:bg-white/10"
                            }`}
                    >
                        <span className={`material-symbols-outlined ${value === role.id ? 'text-primary' : 'text-gray-500'}`}>
                            {role.icon}
                        </span>
                        <span className="font-medium text-sm">{role.label}</span>
                    </button>
                ))}
            </div>

            <div className="mt-8 flex justify-end">
                <button
                    onClick={onNext}
                    disabled={!value}
                    className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-hover transition-colors btn-tactile"
                >
                    Next
                </button>
            </div>
        </motion.div>
    );
}
