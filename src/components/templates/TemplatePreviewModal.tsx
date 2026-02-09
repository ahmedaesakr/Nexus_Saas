"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactFlow, Controls, Background, ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { AgentNode } from "@/components/workflows/nodes/AgentNode";
import { TriggerNode } from "@/components/workflows/nodes/TriggerNode";
import { ActionNode } from "@/components/workflows/nodes/ActionNode";
import { ConditionNode } from "@/components/workflows/nodes/ConditionNode";
import { LoopNode } from "@/components/workflows/nodes/LoopNode";
import { DelayNode } from "@/components/workflows/nodes/DelayNode";
import { Template } from "@/types/workflow";
import { useRouter } from "next/navigation";

const nodeTypes = {
    "ai-agent": AgentNode,
    trigger: TriggerNode,
    action: ActionNode,
    condition: ConditionNode,
    loop: LoopNode,
    delay: DelayNode,
};

export function TemplatePreviewModal({
    template,
    isOpen,
    onClose,
}: {
    template: Template | null;
    isOpen: boolean;
    onClose: () => void;
}) {
    const router = useRouter();

    if (!isOpen || !template) return null;

    const handleUse = () => {
        // In real app, we would clone template to user's workflows
        // For MVP, just redirect
        // Store template ID in local storage or query param?
        localStorage.setItem("nexus_template_clone", JSON.stringify(template));
        router.push("/workflows/builder?template=" + template.id);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            >
                <div className="w-full max-w-5xl h-[80vh] bg-[#0c1018] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col relative">
                    {/* Header */}
                    <div className="h-16 px-6 border-b border-white/10 flex items-center justify-between bg-[#0c1018]">
                        <div>
                            <h2 className="text-xl font-bold text-white flex items-center gap-3">
                                {template.title}
                                <span className="text-xs px-2 py-1 bg-white/5 rounded-md border border-white/10 font-mono text-gray-400 uppercase tracking-wide">
                                    {template.category}
                                </span>
                            </h2>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    <div className="flex-1 flex overflow-hidden">
                        {/* Sidebar Info */}
                        <div className="w-80 border-r border-white/10 bg-[#050a14] p-6 overflow-y-auto">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Description</h3>
                            <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                                {template.description}
                            </p>

                            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Required Integrations</h3>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {template.requiredIntegrations.length > 0 ? (
                                    template.requiredIntegrations.map((int) => (
                                        <div key={int} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white capitalize flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">extension</span>
                                            {int}
                                        </div>
                                    ))
                                ) : (
                                    <span className="text-xs text-gray-500">No external integrations required.</span>
                                )}
                            </div>

                            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Details</h3>
                            <div className="space-y-3 text-sm text-gray-400">
                                <div className="flex justify-between">
                                    <span>Est. Setup Time</span>
                                    <span className="text-white">{template.estimatedTime}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Nodes</span>
                                    <span className="text-white">{template.nodes.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Structure</span>
                                    <span className="text-white">Linear</span>
                                </div>
                            </div>
                        </div>

                        {/* Preview */}
                        <div className="flex-1 bg-[#050a14] relative">
                            <ReactFlowProvider>
                                <ReactFlow
                                    defaultNodes={template.nodes}
                                    defaultEdges={template.edges}
                                    nodeTypes={nodeTypes}
                                    fitView
                                    proOptions={{ hideAttribution: true }}
                                    nodesDraggable={false}
                                    nodesConnectable={false}
                                >
                                    <Background color="#1e293b" gap={16} />
                                    <Controls className="!bg-[#0c1018] !border-white/10 !text-white [&>button]:!fill-white [&>button:hover]:!bg-white/10" />
                                </ReactFlow>
                            </ReactFlowProvider>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 border-t border-white/10 bg-[#0c1018] flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleUse}
                            className="px-6 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-primary/20 btn-tactile flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined">rocket_launch</span>
                            Use Template
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
