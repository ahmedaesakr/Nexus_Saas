"use client";

import { motion } from "framer-motion";

export function BentoFeatureGrid() {
    return (
        <section id="features" className="relative z-10 py-32">
            <div className="container">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Built for the AI Era</h2>
                    <p className="text-xl text-gray-400">Everything you need to orchestrate complex business processes.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                    {/* Visual Builder - Large Card */}
                    <div className="md:col-span-2 md:row-span-2 bg-[#0c1018]/50 border border-white/10 rounded-3xl p-10 relative group overflow-hidden hover:border-white/20 transition-all hover:bg-[#0c1018]">
                        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-30 transition-opacity rotate-12 translate-x-10 -translate-y-10">
                            <span className="material-symbols-outlined text-9xl" aria-hidden="true">account_tree</span>
                        </div>
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-primary text-2xl" aria-hidden="true">drag_indicator</span>
                                </div>
                                <h3 className="text-3xl font-bold mb-4">Visual Workflow Builder</h3>
                                <p className="text-gray-400 text-lg max-w-md">
                                    Drag, drop, and connect. Create complex logic paths, loops, and conditions without writing a single line of code.
                                </p>
                            </div>
                            {/* Mock UI Representation */}
                            <div className="w-full h-48 bg-[#050a14] rounded-xl border border-white/10 mt-8 relative overflow-hidden shadow-2xl">
                                <div className="absolute top-4 left-4 right-4 h-2 bg-white/10 rounded-full" />
                                <div className="absolute top-10 left-4 w-1/3 h-20 bg-primary/20 rounded-lg border border-primary/30 backdrop-blur-sm" />
                                <div className="absolute top-10 right-4 w-1/3 h-20 bg-indigo-500/20 rounded-lg border border-indigo-500/30 backdrop-blur-sm" />
                                <div className="absolute top-20 left-1/2 w-full h-0.5 bg-white/10 -translate-x-1/2 overflow-hidden">
                                    <div className="w-1/3 h-full bg-primary/50 animate-pulse ml-0" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI Agents */}
                    <div className="bg-[#0c1018]/50 border border-white/10 rounded-3xl p-8 relative group hover:-translate-y-2 transition-transform duration-300 hover:bg-[#0c1018] hover:shadow-xl">
                        <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-indigo-400 text-2xl" aria-hidden="true">psychology</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">AI Agent Studio</h3>
                        <p className="text-gray-400">Train custom agents with your own data and instructions to handle specific tasks.</p>
                    </div>

                    {/* Integrations */}
                    <div className="bg-[#0c1018]/50 border border-white/10 rounded-3xl p-8 relative group hover:-translate-y-2 transition-transform duration-300 hover:bg-[#0c1018] hover:shadow-xl">
                        <div className="w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-pink-400 text-2xl" aria-hidden="true">hub</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">50+ Integrations</h3>
                        <p className="text-gray-400">Connect seamlessly with Slack, Gmail, Salesforce, HubSpot, and your internal APIs.</p>
                    </div>

                    {/* Analytics - Wide */}
                    <div className="md:col-span-3 bg-[#0c1018]/50 border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 hover:bg-[#0c1018] transition-colors group">
                        <div className="flex-1">
                            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-green-400 text-2xl" aria-hidden="true">monitoring</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Real-Time ROI Analytics</h3>
                            <p className="text-gray-400 text-lg">
                                Track every execution. See exactly how much time and money your automations are saving your team in real-time.
                            </p>
                        </div>
                        <div className="flex-1 w-full h-40 bg-[#050a14] rounded-xl border border-white/10 flex items-end p-4 gap-2 shadow-inner">
                            <div className="w-1/5 h-[40%] bg-primary/30 rounded-t-lg transition-all group-hover:h-[45%]" />
                            <div className="w-1/5 h-[60%] bg-primary/40 rounded-t-lg transition-all group-hover:h-[65%]" />
                            <div className="w-1/5 h-[50%] bg-primary/50 rounded-t-lg transition-all group-hover:h-[55%]" />
                            <div className="w-1/5 h-[80%] bg-primary/60 rounded-t-lg transition-all group-hover:h-[85%]" />
                            <div className="w-1/5 h-[95%] bg-primary rounded-t-lg shadow-[0_0_20px_rgba(13,89,242,0.5)] transition-all group-hover:h-[100%]" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
