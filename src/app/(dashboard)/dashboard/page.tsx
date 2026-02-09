"use client";

export default function DashboardPage() {
    return (
        <div className="p-8 container animate-fade-in space-y-8">
            {/* Welcome Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                    <p className="text-gray-400">Overview of your automated workflows and agent performance.</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">Last updated: Just now</span>
                    <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                        <span className="material-symbols-outlined">refresh</span>
                    </button>
                </div>
            </div>

            {/* KPI Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Active Workflows", value: "8", change: "+2", icon: "account_tree", color: "text-blue-400", bg: "bg-blue-500/20" },
                    { label: "Total Executions", value: "1,240", change: "+15%", icon: "bolt", color: "text-amber-400", bg: "bg-amber-500/20" },
                    { label: "Success Rate", value: "98.5%", change: "+0.5%", icon: "check_circle", color: "text-green-400", bg: "bg-green-500/20" },
                    { label: "Hours Saved", value: "45h", change: "+12h", icon: "history", color: "text-purple-400", bg: "bg-purple-500/20" },
                ].map((stat, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-[#0c1018] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                                <span className={`material-symbols-outlined ${stat.color}`}>{stat.icon}</span>
                            </div>
                            <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded-full flex items-center gap-1">
                                <span className="material-symbols-outlined text-[10px]">trending_up</span>
                                {stat.change}
                            </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                        <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart Area */}
                <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0c1018] border border-white/10">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-white">Execution Volume</h3>
                        <select className="bg-white/5 border border-white/10 text-xs text-gray-400 rounded-lg px-3 py-1.5 focus:outline-none">
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                        </select>
                    </div>
                    {/* Mock Chart */}
                    <div className="h-64 flex items-end gap-3 px-2">
                        {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                            <div key={i} className="flex-1 group relative">
                                <div
                                    className="w-full bg-primary/20 hover:bg-primary/40 rounded-t-sm transition-all relative overflow-hidden"
                                    style={{ height: `${h}%` }}
                                >
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-primary/50" />
                                </div>
                                <div className="text-center text-[10px] text-gray-600 mt-2">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                                </div>
                                {/* Tooltip */}
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                    {h * 12} runs
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="p-6 rounded-2xl bg-[#0c1018] border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        {[
                            { title: "Sales Outreach", status: "success", time: "2m ago", desc: "Sent 15 emails" },
                            { title: "Support Triage", status: "running", time: "5m ago", desc: "Processing ticket #492" },
                            { title: "Lead Qualify", status: "failed", time: "1h ago", desc: "API Timeout (Salesforce)" },
                            { title: "Data Sync", status: "success", time: "2h ago", desc: "Synced 400 records" },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 group">
                                <div className="relative">
                                    <div className="w-px h-full bg-white/10 absolute top-2 left-1/2 -translate-x-1/2" />
                                    <div className={`w-2 h-2 rounded-full relative z-10 mt-2 ${item.status === 'success' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' :
                                            item.status === 'running' ? 'bg-blue-500 animate-pulse' :
                                                'bg-red-500'
                                        }`} />
                                </div>
                                <div className="pb-2">
                                    <p className="text-sm font-medium text-white group-hover:text-primary transition-colors">{item.title}</p>
                                    <p className="text-xs text-gray-500 mb-1">{item.desc}</p>
                                    <span className="text-[10px] text-gray-600">{item.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-4 py-2 text-xs font-medium text-gray-400 hover:text-white border border-white/5 hover:bg-white/5 rounded-lg transition-all">
                        View Execution Log
                    </button>
                </div>
            </div>
        </div>
    );
}
