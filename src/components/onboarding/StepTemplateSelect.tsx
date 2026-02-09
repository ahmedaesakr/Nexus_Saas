"use client";

import { motion } from "framer-motion";

const templates = [
    {
        id: "scratch",
        title: "Start from Scratch",
        description: "Build your own workflow from the ground up.",
        icon: "add_circle_outline",
        color: "text-gray-400",
        bg: "bg-white/5",
    },
    {
        id: "lead_qual",
        title: "Lead Qualification Agent",
        description: "AI reads new leads, scores them, and updates your CRM.",
        icon: "filter_list",
        color: "text-green-400",
        bg: "bg-green-500/10",
        role: "sales"
    },
    {
        id: "support_triage",
        title: "Support Ticket Triage",
        description: "Categorize incoming tickets and route to the right team.",
        icon: "support_agent",
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        role: "support"
    },
    {
        id: "content_repurpose",
        title: "Blog to Social Media",
        description: "Automatically turn blog posts into tweets and LinkedIn posts.",
        icon: "article",
        color: "text-pink-400",
        bg: "bg-pink-500/10",
        role: "marketing"
    },
];

export function StepTemplateSelect({
    role,
    onSelect,
    onNext,
    onBack,
}: {
    role: string;
    onSelect: (templateId: string) => void;
    onNext: () => void;
    onBack: () => void;
}) {
    // Basic recommendation logic
    const recommendedTemplates = templates.filter(t => t.role === role || t.id === "scratch");
    // If no specific match, show defaults
    const displayTemplates = recommendedTemplates.length > 1 ? recommendedTemplates : templates;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col h-full"
        >
            <h2 className="text-2xl font-bold text-white mb-2">Choose a starting point</h2>
            <p className="text-gray-400 mb-8">We've selected some templates based on your role.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {displayTemplates.map((template) => (
                    <button
                        key={template.id}
                        onClick={() => {
                            onSelect(template.id);
                            onNext();
                        }}
                        className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-left flex flex-col gap-3 group relative overflow-hidden"
                    >
                        <div className={`w-10 h-10 rounded-lg ${template.bg} flex items-center justify-center mb-2`}>
                            <span className={`material-symbols-outlined ${template.color}`}>
                                {template.icon}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg mb-1">{template.title}</h3>
                            <p className="text-gray-400 text-xs leading-relaxed">{template.description}</p>
                        </div>
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="material-symbols-outlined text-primary">arrow_forward</span>
                        </div>
                    </button>
                ))}
            </div>

            <div className="mt-8 flex justify-between pt-4 border-t border-white/5">
                <button
                    onClick={onBack}
                    className="px-6 py-2 bg-white/5 text-gray-400 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
                >
                    Back
                </button>
                {/* Clicking a template automatically proceeds, but keeping Next button just in case */}
                {/* But the design implies clicking a card selects it. Let's make the card click trigger onNext implicitly or select state.
                    For simplicity, card click -> select & next.
                */}
            </div>
        </motion.div>
    );
}
