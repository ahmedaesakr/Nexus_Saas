"use client";

import Link from "next/link";

export default function AgentsPage() {
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
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="group p-6 bg-[#0c1018] border border-white/10 rounded-2xl hover:border-primary/30 transition-all hover:-translate-y-1 cursor-pointer overflow-hidden relative"
                    >
                        {/* Background Gradient */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />

                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/30 transition-colors relative overflow-hidden">
                                <span className="material-symbols-outlined text-2xl text-gray-400 group-hover:text-primary transition-colors">
                                    {i === 1 ? 'support_agent' : i === 2 ? 'mark_email_read' : i === 3 ? 'person_search' : 'analytics'}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20 flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[10px] font-medium text-green-400">Active</span>
                                </div>
                                <button className="text-gray-500 hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-lg">settings</span>
                                </button>
                            </div>
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">
                                {i === 1 ? 'Support Specialist' : i === 2 ? 'Outreach Copilot' : i === 3 ? 'Recruiter AI' : 'Data Analyst'}
                            </h3>
                            <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                                {i === 1
                                    ? 'Handles Tier 1 support tickets, classifies issues, and drafts responses.'
                                    : i === 2
                                        ? 'Personalizes cold emails and manages follow-up sequences.'
                                        : 'Screens resumes and schedules initial interviews.'}
                            </p>

                            <div className="flex items-center gap-4 text-xs text-gray-500 border-t border-white/5 pt-4">
                                <div className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">model_training</span>
                                    <span>Claude 3.5 Sonnet</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">history</span>
                                    <span>245 runs</span>
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
