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
        // Redirect logic similar to modal
        window.location.href = `/workflows/builder?template=${template.id}`;
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Template Gallery</h1>
                    <p className="text-gray-400">Jumpstart your automation with pre-built workflows.</p>
                </div>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 text-sm">search</span>
                    <input
                        type="text"
                        placeholder="Search templates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 pr-4 py-2 bg-[#0c1018] border border-white/10 rounded-lg text-sm text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all w-64"
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                            ${selectedCategory === cat.id
                                ? "bg-white text-black font-bold"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                            }
                        `}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Template Grid */}
            {filteredTemplates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredTemplates.map((template) => (
                        <TemplateCard
                            key={template.id}
                            template={template}
                            onPreview={handlePreview}
                            onUse={handleUse}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 border border-dashed border-white/10 rounded-xl bg-white/5">
                    <span className="material-symbols-outlined text-4xl text-gray-600 mb-4">search_off</span>
                    <p className="text-gray-400 text-lg">No templates found matching your criteria.</p>
                    <button
                        onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
                        className="mt-4 px-4 py-2 text-sm text-primary hover:underline"
                    >
                        Clear filters
                    </button>
                </div>
            )}

            {/* Preview Modal */}
            {previewTemplate && (
                <TemplatePreviewModal
                    isOpen={!!previewTemplate}
                    template={previewTemplate}
                    onClose={() => setPreviewTemplate(null)}
                />
            )}
        </div>
    );
}
