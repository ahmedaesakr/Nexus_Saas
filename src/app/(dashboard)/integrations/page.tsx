"use client";

import { useState } from "react";

export default function IntegrationsPage() {
    const [activeTab, setActiveTab] = useState("all");

    const integrations = [
        { name: "Slack", category: "communication", connected: true, icon: "chat" },
        { name: "Gmail", category: "communication", connected: false, icon: "mail" },
        { name: "Salesforce", category: "crm", connected: false, icon: "cloud" },
        { name: "HubSpot", category: "crm", connected: true, icon: "hub" },
        { name: "GitHub", category: "developer", connected: true, icon: "code" },
        { name: "Notion", category: "productivity", connected: false, icon: "article" },
        { name: "Stripe", category: "finance", connected: false, icon: "payments" },
        { name: "Zendesk", category: "support", connected: false, icon: "support_agent" },
        { name: "Intercom", category: "support", connected: false, icon: "chat_bubble" },
    ];

    return (
        <div className="p-8 container animate-fade-in space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Integrations</h1>
                    <p className="text-gray-400">Connect Nexus Flow to your favorite tools.</p>
                </div>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 text-sm">search</span>
                    <input
                        type="text"
                        placeholder="Search apps..."
                        className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none w-64 transition-all"
                    />
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto scrollbar-none">
                {['all', 'crm', 'communication', 'developer', 'support'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all whitespace-nowrap ${activeTab === tab
                                ? 'bg-white/10 text-white'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Integration Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {integrations
                    .filter(i => activeTab === 'all' || i.category === activeTab)
                    .map((app) => (
                        <div key={app.name} className="p-6 bg-[#0c1018] border border-white/10 rounded-2xl hover:border-primary/30 transition-all group relative overflow-hidden">

                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/30 transition-colors">
                                    <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors text-2xl">
                                        {app.icon}
                                    </span>
                                </div>
                                {app.connected ? (
                                    <span className="flex items-center gap-1 text-[10px] font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        Connected
                                    </span>
                                ) : (
                                    <button className="text-gray-500 hover:text-white transition-colors">
                                        <span className="material-symbols-outlined">add</span>
                                    </button>
                                )}
                            </div>

                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">{app.name}</h3>
                            <p className="text-xs text-gray-400 mb-6 capitalize">{app.category}</p>

                            <button
                                className={`w-full py-2 rounded-lg text-sm font-medium transition-all ${app.connected
                                        ? 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                                        : 'bg-primary text-white hover:bg-primary-hover shadow-[0_0_15px_rgba(13,89,242,0.2)] btn-tactile'
                                    }`}
                            >
                                {app.connected ? 'Manage' : 'Connect'}
                            </button>
                        </div>
                    ))}

                {/* Request Integration */}
                <button className="p-6 bg-white/5 border border-white/10 border-dashed rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all flex flex-col items-center justify-center text-center group">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-gray-400 text-xl">add</span>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1">Request App</h3>
                    <p className="text-xs text-gray-500">Don't see what you need?</p>
                </button>
            </div>
        </div>
    );
}
