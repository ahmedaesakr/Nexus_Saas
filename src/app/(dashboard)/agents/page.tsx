"use client";

import { useEffect, useState } from "react";

interface Agent {
    id: string;
    name: string;
    description: string | null;
    model: string;
    temperature: number;
    createdAt: string;
}

export default function AgentsPage() {
    const [agents, setAgents] = useState<Agent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/agents")
            .then((res) => (res.ok ? res.json() : []))
            .then(setAgents)
            .catch(() => setAgents([]))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="p-8 container animate-fade-in space-y-8">
                <div className="h-8 w-48 bg-white/5 rounded animate-pulse" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4].map((i) => <div key={i} className="h-56 rounded-2xl bg-white/5 animate-pulse" />)}
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 container animate-fade-in space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">AI Agents</h1>
                    <p className="text-gray-400">Configure intelligent agents to handle specialized tasks.</p>
                </div>
                <button className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold shadow-[0_0_20px_rgba(13,89,242,0.3)] hover:shadow-[0_0_30px_rgba(13,89,242,0.5)] transition-all btn-tactile flex items-center gap-2">
                    <span className="material-symbols-outlined">add</span>
                    Create Agent
                </button>
            </div>

            {/* Agents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map((agent) => (
                    <div
                        key={agent.id}
                        className="group p-6 bg-[#0c1018] border border-white/10 rounded-2xl hover:border-primary/30 transition-all hover:-translate-y-1 cursor-pointer overflow-hidden relative"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />

                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/30 transition-colors">
                                <span className="material-symbols-outlined text-2xl text-gray-400 group-hover:text-primary transition-colors">
                                    psychology
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20 flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[10px] font-medium text-green-400">Active</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">
                                {agent.name}
                            </h3>
                            <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                                {agent.description || "No description"}
                            </p>

                            <div className="flex items-center gap-4 text-xs text-gray-500 border-t border-white/5 pt-4">
                                <div className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">model_training</span>
                                    <span>{agent.model}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">thermostat</span>
                                    <span>{agent.temperature}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Create New Card */}
                <button className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 border-dashed rounded-2xl hover:bg-white/10 hover:border-primary/30 transition-all cursor-pointer group min-h-[220px]">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-3xl text-primary">add</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">Custom Agent</h3>
                    <p className="text-sm text-gray-500 text-center">Train a new agent from scratch</p>
                </button>
            </div>
        </div>
    );
}
