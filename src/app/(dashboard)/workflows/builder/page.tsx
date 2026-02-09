"use client";

import { useState } from "react";
import Link from "next/link";

export default function WorkflowBuilderPage() {
    const [isDeploying, setIsDeploying] = useState(false);

    return (
        <div className="h-[calc(100vh-64px)] flex flex-col bg-[#0c1018] overflow-hidden -m-8 rounded-none">
            {/* Builder Header */}
            <header className="h-16 border-b border-white/10 bg-[#0c1018] flex items-center justify-between px-6 shrink-0 z-20">
                <div className="flex items-center gap-4">
                    <Link href="/workflows" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/10 transition-colors">
                        <span className="material-symbols-outlined text-gray-400">arrow_back</span>
                    </Link>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-sm font-bold text-white">Untitled Workflow</h1>
                            <span className="material-symbols-outlined text-gray-500 text-sm cursor-pointer hover:text-white">edit</span>
                        </div>
                        <p className="text-xs text-gray-500">Draft • Last saved just now</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">play_arrow</span>
                        Test Run
                    </button>
                    <button className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-lg transition-colors shadow-[0_0_15px_rgba(13,89,242,0.3)] btn-tactile flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">rocket_launch</span>
                        Publish
                    </button>
                </div>
            </header>

            {/* Main Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar: Nodes Palette */}
                <div className="w-64 border-r border-white/10 bg-[#0c1018] flex flex-col z-10">
                    <div className="p-4 border-b border-white/10">
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 text-sm">search</span>
                            <input
                                type="text"
                                placeholder="Search nodes..."
                                className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-6">
                        <div>
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Core</h3>
                            <div className="space-y-2">
                                {['Trigger', 'Action', 'Condition', 'Loop'].map((node) => (
                                    <div key={node} className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg cursor-grab active:cursor-grabbing transition-all flex items-center gap-3 group">
                                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary group-hover:text-white group-hover:bg-primary transition-colors">
                                            <span className="material-symbols-outlined text-lg">
                                                {node === 'Trigger' ? 'bolt' : node === 'Action' ? 'play_circle' : node === 'Condition' ? 'call_split' : 'loop'}
                                            </span>
                                        </div>
                                        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{node}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">AI Agents</h3>
                            <div className="space-y-2">
                                <div className="p-3 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 hover:border-indigo-500/40 rounded-lg cursor-grab transition-all flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                        <span className="material-symbols-outlined text-lg">psychology</span>
                                    </div>
                                    <span className="text-sm font-medium text-indigo-200">AI Agent</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Integrations</h3>
                            <div className="space-y-2">
                                {['Slack', 'Gmail', 'Salesforce'].map((app) => (
                                    <div key={app} className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg cursor-grab transition-all flex items-center gap-3">
                                        <span className="material-symbols-outlined text-gray-400">hub</span>
                                        <span className="text-sm font-medium text-gray-300">{app}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Canvas Area (Placeholder for XYFlow) */}
                <div className="flex-1 bg-[#050a14] relative overflow-hidden bg-[url('/grid.svg')] bg-opacity-5">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10 animate-pulse">
                                <span className="material-symbols-outlined text-4xl text-gray-600">drag_indicator</span>
                            </div>
                            <p className="font-medium">Drag nodes here to specify workflow logic</p>
                            <p className="text-sm text-gray-600 mt-2">React Flow Canvas Placeholder</p>
                        </div>
                    </div>

                    {/* Toolbar */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 p-2 bg-[#0c1018] border border-white/10 rounded-xl shadow-2xl flex items-center gap-1">
                        <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors" title="Zoom Out">
                            <span className="material-symbols-outlined">remove</span>
                        </button>
                        <span className="text-xs font-mono text-gray-500 w-12 text-center">100%</span>
                        <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors" title="Zoom In">
                            <span className="material-symbols-outlined">add</span>
                        </button>
                        <div className="w-px h-6 bg-white/10 mx-1" />
                        <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors" title="Fit View">
                            <span className="material-symbols-outlined">center_focus_strong</span>
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors" title="Layout">
                            <span className="material-symbols-outlined">auto_fix_high</span>
                        </button>
                    </div>
                </div>

                {/* Properties Panel */}
                <div className="w-80 border-l border-white/10 bg-[#0c1018] flex flex-col z-10">
                    <div className="p-4 border-b border-white/10">
                        <h3 className="text-sm font-bold text-white">Properties</h3>
                    </div>
                    <div className="p-8 text-center text-gray-500 mt-20">
                        <span className="material-symbols-outlined text-4xl mb-2 opacity-50">touch_app</span>
                        <p className="text-sm">Select a node to configure its properties</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
