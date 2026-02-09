"use client";

import { Template } from "@/types/workflow";
import { motion } from "framer-motion";

export function TemplateCard({
    template,
    onUse,
    onPreview,
}: {
    template: Template;
    onUse: (template: Template) => void;
    onPreview: (template: Template) => void;
}) {
    const categoryColors = {
        sales: "bg-blue-500",
        marketing: "bg-pink-500",
        support: "bg-amber-500",
        operations: "bg-purple-500",
    };

    return (
        <div className="group relative bg-[#0c1018] border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all hover:shadow-xl flex flex-col h-full hover:-translate-y-1 duration-300">
            {/* Header / Banner */}
            <div className="h-32 bg-white/5 relative overflow-hidden flex items-center justify-center">
                <div className={`absolute inset-0 opacity-10 ${categoryColors[template.category]}`} />
                {/* Abstract visual depending on category */}
                <div className="scale-75 opacity-50 blur-sm">
                    {/* Placeholder for preview logic - could use small ReactFlow or Image */}
                    <div className="flex flex-col items-center gap-2">
                        <div className={`w-36 h-12 rounded-lg border border-white/20 ${categoryColors[template.category]} bg-opacity-20`} />
                        <div className="w-0.5 h-6 bg-white/20" />
                        <div className="w-36 h-12 rounded-lg border border-white/20 bg-white/5" />
                    </div>
                </div>

                <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 rounded bg-black/40 backdrop-blur text-[10px] font-bold uppercase tracking-wider text-white border border-white/10">
                        {template.category}
                    </span>
                </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1">{template.title}</h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{template.description}</p>

                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">schedule</span>
                            {template.estimatedTime}
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">hub</span>
                            {template.requiredIntegrations.length}
                        </span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="p-4 pt-0 grid grid-cols-2 gap-3">
                <button
                    onClick={() => onPreview(template)}
                    className="flex justify-center items-center py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors"
                >
                    Preview
                </button>
                <button
                    onClick={() => onUse(template)}
                    className="flex justify-center items-center py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-lg shadow-primary/20 transition-all btn-tactile"
                >
                    Use Template
                </button>
            </div>
        </div>
    );
}
