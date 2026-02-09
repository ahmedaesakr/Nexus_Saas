"use client";

import { motion } from "framer-motion";

const goalsList = [
    { id: "lead_gen", label: "Automate lead qualification", icon: "search" },
    { id: "support", label: "Reduce support ticket volume", icon: "support_agent" },
    { id: "data_sync", label: "Sync data between tools", icon: "sync" },
    { id: "outreach", label: "Send automated follow-ups", icon: "email" },
    { id: "reports", label: "Generate reports automatically", icon: "assessment" },
    { id: "other", label: "Other", icon: "more_horiz" },
];

export function StepGoals({
    values,
    onChange,
    onNext,
    onBack,
}: {
    values: string[];
    onChange: (goals: string[]) => void;
    onNext: () => void;
    onBack: () => void;
}) {
    const handleToggle = (id: string, checked: boolean) => {
        if (checked) {
            onChange([...values, id]);
        } else {
            onChange(values.filter((v) => v !== id));
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col h-full"
        >
            <h2 className="text-2xl font-bold text-white mb-2">What are your main goals?</h2>
            <p className="text-gray-400 mb-8">Select all that apply to help us suggest the right templates.</p>

            <div className="grid grid-cols-2 gap-4 flex-1">
                {goalsList.map((goal) => (
                    <label
                        key={goal.id}
                        className={`p-4 rounded-xl border transition-all flex items-center gap-3 cursor-pointer ${values.includes(goal.id)
                                ? "bg-primary/10 border-primary text-white shadow-[0_0_15px_rgba(13,89,242,0.2)]"
                                : "bg-white/5 border-white/10 hover:border-white/20 text-gray-300 hover:bg-white/10"
                            }`}
                    >
                        <input
                            type="checkbox"
                            className="hidden"
                            checked={values.includes(goal.id)}
                            onChange={(e) => handleToggle(goal.id, e.target.checked)}
                        />
                        <span className={`material-symbols-outlined ${values.includes(goal.id) ? 'text-primary' : 'text-gray-500'}`}>
                            {goal.icon}
                        </span>
                        <span className="font-medium text-sm">{goal.label}</span>
                    </label>
                ))}
            </div>

            <div className="mt-8 flex justify-between">
                <button
                    onClick={onBack}
                    className="px-6 py-2 bg-white/5 text-gray-400 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
                >
                    Back
                </button>
                <button
                    onClick={onNext}
                    disabled={values.length === 0}
                    className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-hover transition-colors btn-tactile"
                >
                    Next
                </button>
            </div>
        </motion.div>
    );
}
