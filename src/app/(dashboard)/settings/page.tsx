"use client";

import { useState } from "react";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("general");

    const tabs = [
        { id: "general", label: "General", icon: "settings" },
        { id: "billing", label: "Billing & Plans", icon: "credit_card" },
        { id: "team", label: "Team Members", icon: "group" },
        { id: "api", label: "API Keys", icon: "key" },
        { id: "notifications", label: "Notifications", icon: "notifications" },
    ];

    return (
        <div className="p-8 container animate-fade-in space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
                    <p className="text-gray-400">Manage your workspace preferences and configuration.</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Tabs */}
                <div className="w-full lg:w-64 space-y-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id
                                    ? "bg-primary text-white shadow-[0_0_15px_rgba(13,89,242,0.3)]"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-[#0c1018] border border-white/10 rounded-2xl p-8 min-h-[500px]">
                    {activeTab === "general" && (
                        <div className="space-y-6 animate-fade-in">
                            <h2 className="text-xl font-bold text-white mb-4">Workspace General</h2>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Workspace Name</label>
                                    <input
                                        type="text"
                                        defaultValue="Nexus Flow Team"
                                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Support Email</label>
                                    <input
                                        type="email"
                                        defaultValue="support@nexusflow.app"
                                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10">
                                <button className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition-colors shadow-[0_0_15px_rgba(13,89,242,0.2)]">Save Changes</button>
                            </div>
                        </div>
                    )}

                    {activeTab === "billing" && (
                        <div className="space-y-6 animate-fade-in">
                            <h2 className="text-xl font-bold text-white mb-4">Plan & Billing</h2>

                            <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-white/10 mb-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                                <div className="flex justify-between items-start relative z-10">
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Current Plan</p>
                                        <h3 className="text-2xl font-bold text-white">Pro Plan</h3>
                                        <p className="text-sm text-gray-400 mt-2">$99/month, billed monthly</p>
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/20 text-xs font-bold flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        Active
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-white">Payment Method</h3>
                                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                                            <span className="material-symbols-outlined text-gray-800">credit_card</span>
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">Visa ending in 4242</p>
                                            <p className="text-xs text-gray-500">Expires 12/28</p>
                                        </div>
                                    </div>
                                    <button className="text-sm text-primary hover:text-white transition-colors">Edit</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {(activeTab === "team" || activeTab === "api" || activeTab === "notifications") && (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4 animate-fade-in min-h-[300px]">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                <span className="material-symbols-outlined text-3xl text-gray-600">construction</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Under Construction</h3>
                                <p className="text-gray-400 max-w-sm mx-auto">This module is currently being built by our autonomous agents. Check back soon.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
