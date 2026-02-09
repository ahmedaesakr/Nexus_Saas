"use client";

export default function ExecutionsPage() {
    const executions = [
        { id: "exec_1", workflow: "Sales Outreach", status: "completed", triggered: "Auto", time: "2 min ago", duration: "45s" },
        { id: "exec_2", workflow: "Support Triage", status: "running", triggered: "Webhook", time: "5 min ago", duration: "Running" },
        { id: "exec_3", workflow: "Lead Qualify", status: "failed", triggered: "Manual", time: "1 hour ago", duration: "12s" },
        { id: "exec_4", workflow: "Data Sync", status: "completed", triggered: "Schedule", time: "2 hours ago", duration: "2m 10s" },
        { id: "exec_5", workflow: "Onboarding Flow", status: "completed", triggered: "Auto", time: "3 hours ago", duration: "1m 30s" },
    ];

    return (
        <div className="p-8 container animate-fade-in space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Executions</h1>
                    <p className="text-gray-400">Real-time history of your automated workflow runs.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium text-white transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined text-gray-400 text-lg">filter_list</span>
                        Filter
                    </button>
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium text-white transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined text-gray-400 text-lg">download</span>
                        Export
                    </button>
                </div>
            </div>

            {/* Execution Table */}
            <div className="bg-[#0c1018] border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Workflow</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Trigger</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Duration</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {executions.map((exec) => (
                            <tr key={exec.id} className="hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium border ${exec.status === 'completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                            exec.status === 'running' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                'bg-red-500/10 text-red-400 border-red-500/20'
                                        }`}>
                                        {exec.status === 'running' && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />}
                                        <span className="capitalize">{exec.status}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-gray-400">
                                            <span className="material-symbols-outlined text-lg">account_tree</span>
                                        </div>
                                        <span className="font-medium text-white">{exec.workflow}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                    {exec.triggered}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-mono">
                                    {exec.duration}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {exec.time}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <button className="p-2 hover:bg-white/10 rounded-lg text-gray-500 hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-lg">visibility</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Empty State / Pagination */}
                <div className="px-6 py-4 border-t border-white/10 bg-white/5 flex justify-between items-center">
                    <span className="text-xs text-gray-500">Showing 5 of 1240 runs</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 bg-[#0c1018] border border-white/10 rounded-lg text-xs text-gray-400 hover:text-white transition-colors disabled:opacity-50">Prev</button>
                        <button className="px-3 py-1 bg-[#0c1018] border border-white/10 rounded-lg text-xs text-gray-400 hover:text-white transition-colors">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
