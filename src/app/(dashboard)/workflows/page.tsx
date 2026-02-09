"use client";

import Link from "next/link";

export default function WorkflowsPage() {
    return (
        <div className="p-8 container animate-fade-in space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Workflows</h1>
                    <p className="text-gray-400">Manage and automate your business processes.</p>
                </div>
                <Link
                    href="/workflows/builder"
                    className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold shadow-[0_0_20px_rgba(13,89,242,0.3)] hover:shadow-[0_0_30px_rgba(13,89,242,0.5)] transition-all btn-tactile flex items-center gap-2"
                >
                    <span className="material-symbols-outlined">add</span>
                    New Workflow
                </Link>
            </div>

            {/* Workflow Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-green-400">play_circle</span>
                        </div>
                        <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full">+12%</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">Active Workflows</p>
                    <p className="text-2xl font-bold text-white">8</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-blue-400">bolt</span>
                        </div>
                        <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full">+24%</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">Total Executions</p>
                    <p className="text-2xl font-bold text-white">1,240</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-purple-400">timer</span>
                        </div>
                        <span className="text-xs text-purple-400 bg-purple-500/10 px-2 py-1 rounded-full">High</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">Time Saved</p>
                    <p className="text-2xl font-bold text-white">45h</p>
                </div>
            </div>

            {/* Workflow Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="group relative p-6 bg-[#0c1018] border border-white/10 rounded-2xl hover:border-primary/30 transition-all hover:-translate-y-1 cursor-pointer overflow-hidden"
                    >
                        {/* Hover Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/30 transition-colors">
                                <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">
                                    {i === 1 ? 'mail' : i === 2 ? 'support_agent' : 'campaign'}
                                </span>
                            </div>
                            <div className="dropdown relative">
                                <button className="text-gray-500 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors">
                                    <span className="material-symbols-outlined">more_vert</span>
                                </button>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                {i === 1 ? 'Sales Outreach' : i === 2 ? 'Support Ticket Triage' : 'Lead Qualification'}
                            </h3>
                            <p className="text-sm text-gray-400 line-clamp-2">
                                {i === 1
                                    ? 'Automatically send follow-up emails to leads who haven\'t responded in 3 days.'
                                    : i === 2
                                        ? 'Categorize incoming support tickets using AI and assign to the right agent.'
                                        : 'Score new leads based on company size and industry data enrichment.'}
                            </p>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
                                <span className="text-xs font-medium text-gray-400">
                                    {i === 1 ? 'Active' : 'Draft'}
                                </span>
                            </div>
                            <span className="text-xs text-gray-500">Edited 2h ago</span>
                        </div>
                    </div>
                ))}

                {/* Create New Card */}
                <Link
                    href="/workflows/builder"
                    className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 border-dashed rounded-2xl hover:bg-white/10 hover:border-primary/30 transition-all cursor-pointer group h-full min-h-[280px]"
                >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-3xl text-primary">add</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">Create Workflow</h3>
                    <p className="text-sm text-gray-500 text-center">Start from scratch or use a template</p>
                </Link>
            </div>
        </div>
    );
}
