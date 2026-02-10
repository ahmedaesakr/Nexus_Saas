"use client";

import { useState } from "react";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { TemplatePreviewModal } from "@/components/templates/TemplatePreviewModal";
import { TEMPLATES } from "@/data/templates";
import { Template } from "@/types/workflow";

export default function TemplatesPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

    const categories = [
        { id: "all", label: "All Templates" },
        { id: "sales", label: "Sales" },
        { id: "marketing", label: "Marketing" },
        { id: "support", label: "Support" },
        { id: "operations", label: "Operations" },
    ];

    const filteredTemplates = TEMPLATES.filter((template) => {
        const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
        const matchesSearch =
            template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handlePreview = (template: Template) => {
        setPreviewTemplate(template);
    };

    const handleUse = (template: Template) => {
        // Logic to create workflow from template
        console.log("Using template", template.id);
    };

    return (
        <div className="container py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Workflow Templates</h1>
                    <p className="text-gray-400">Jumpstart your automation with pre-built workflows.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Search templates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2 rounded-lg bg-[#0c1018] border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none min-w-[240px]"
                    />
                    <div className="flex bg-[#0c1018] rounded-lg border border-white/10 p-1">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${selectedCategory === cat.id
                                    ? "bg-white/10 text-white"
                                    : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTemplates.map((template) => (
                    <TemplateCard
                        key={template.id}
                        template={template}
                        onUse={handleUse}
                        onPreview={handlePreview}
                    />
                ))}
            </div>

            {filteredTemplates.length === 0 && (
                <div className="text-center py-20">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-3xl text-gray-600">search_off</span>
                    </div>
                    <h3 className="text-lg font-medium text-white mb-1">No templates found</h3>
                    <p className="text-gray-500">Try adjusting your search or filters.</p>
                </div>
            )}

            <TemplatePreviewModal
                template={previewTemplate}
                isOpen={!!previewTemplate}
                onClose={() => setPreviewTemplate(null)}
            />
        </div>
    );
}
