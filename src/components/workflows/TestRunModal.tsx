"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Node, Edge } from "@xyflow/react";

export function TestRunModal({
    isOpen,
    onClose,
    nodes,
    edges,
}: {
    isOpen: boolean;
    onClose: () => void;
    nodes: Node[];
    edges: Edge[];
}) {
    const [logs, setLogs] = useState<string[]>([]);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setLogs([]);
            setIsRunning(true);
            runSimulation();
        }
    }, [isOpen]);

    const runSimulation = async () => {
        const addLog = (msg: string) => setLogs((prev) => [...prev, msg]);

        addLog("🚀 Starting workflow execution...");
        await new Promise((r) => setTimeout(r, 800));

        // Sort nodes by simplistic dependency (not real DAG topo sort for now)
        // Just execute in order of appearance or simple logic
        // Find triggers first
        const triggers = nodes.filter((n) => n.type === "trigger");
        if (triggers.length === 0) {
            addLog("⚠️ No trigger found. Starting with first node...");
        }

        for (const node of nodes) {
            addLog(`⚡ Executing ${node.data.label || node.type}...`);
            await new Promise((r) => setTimeout(r, 1000));

            if (node.type === "condition") {
                addLog(`  Notable condition: ${node.data.expression || "true"}`);
                addLog(`  → Proceeding with TRUE path`);
            } else if (node.type === "ai-agent") {
                addLog(`  🤖 AI Agent processing...`);
                await new Promise((r) => setTimeout(r, 1500));
                addLog(`  ✅ AI Agent completed task.`);
            } else if (node.type === "action") {
                addLog(`  🔌 Action ${node.data.service} executed.`);
            }

            // Simulate edge traversal
            const connectedEdges = edges.filter(e => e.source === node.id);
            if (connectedEdges.length > 0) {
                addLog(`  → Flowing to next step...`);
            }
        }

        await new Promise((r) => setTimeout(r, 500));
        addLog("✅ Workflow execution completed successfully.");
        setIsRunning(false);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            >
                <div className="w-full max-w-2xl bg-[#0c1018] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[80vh]">
                    <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#0c1018]">
                        <h3 className="font-bold text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">play_circle</span>
                            Test Run Simulation
                        </h3>
                        <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    <div className="p-6 overflow-y-auto bg-[#050a14] font-mono text-sm space-y-2 flex-1 custom-scrollbar">
                        {logs.map((log, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`border-l-2 pl-3 py-1 ${log.includes("✅") ? "border-green-500 text-green-400" :
                                        log.includes("⚠️") ? "border-yellow-500 text-yellow-400" :
                                            log.includes("🚀") ? "border-blue-500 text-blue-400" :
                                                "border-gray-700 text-gray-300"
                                    }`}
                            >
                                {log}
                            </motion.div>
                        ))}
                        {isRunning && (
                            <div className="flex items-center gap-2 text-gray-500 animate-pulse mt-4">
                                <span className="w-2 h-2 bg-primary rounded-full" />
                                Processing...
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t border-white/10 bg-[#0c1018] flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
