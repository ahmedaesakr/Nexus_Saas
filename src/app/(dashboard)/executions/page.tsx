"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

interface Execution {
    id: string;
    status: string;
    createdAt: string;
    startedAt: string | null;
    completedAt: string | null;
    workflow: { id: string; name: string };
    triggeredBy: { id: string; name: string | null; email: string } | null;
    _count: { logs: number };
}

function formatDuration(startedAt: string | null, completedAt: string | null): string {
    if (!startedAt) return "-";
    if (!completedAt) return "Running";
    const ms = new Date(completedAt).getTime() - new Date(startedAt).getTime();
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(0)}s`;
    return `${Math.floor(ms / 60000)}m ${Math.floor((ms % 60000) / 1000)}s`;
}

export default function ExecutionsPage() {
    const [executions, setExecutions] = useState<Execution[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<string>("all");

    useEffect(() => {
        const params = new URLSearchParams();
        if (statusFilter !== "all") params.set("status", statusFilter);

        fetch(`/api/executions?${params}`)
            .then((res) => (res.ok ? res.json() : []))
            .then(setExecutions)
            .catch(() => setExecutions([]))
            .finally(() => setLoading(false));
    }, [statusFilter]);

    if (loading) {
        return (
            <div className="p-8 container animate-fade-in space-y-8">
                <div className="h-8 w-48 bg-white/5 rounded animate-pulse" />
                <div className="h-96 rounded-2xl bg-white/5 animate-pulse" />
            </div>
        );
    }

    return (
        <div className="p-8 container animate-fade-in space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Executions</h1>
                    <p className="text-gray-400">Real-time history of your automated workflow runs.</p>
                </div>
                <div className="flex items-center gap-3">
                    <select
                        value={statusFilter}
                        onChange={(e) => { setLoading(true); setStatusFilter(e.target.value); }}
                        aria-label="Filter by status"
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium text-white transition-colors outline-none"
                    >
                        <option value="all">All Status</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="RUNNING">Running</option>
                        <option value="FAILED">Failed</option>
                        <option value="PENDING">Pending</option>
                    </select>
                </div>
            </div>

            {/* Execution Table */}
            <div className="bg-[#0c1018] border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Workflow</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Triggered By</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Duration</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {executions.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                    No executions found
                                </td>
                            </tr>
                        ) : (
                            executions.map((exec) => (
                                <tr key={exec.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium border ${
                                            exec.status === "COMPLETED" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                                            exec.status === "RUNNING" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                                            exec.status === "FAILED" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                                            "bg-gray-500/10 text-gray-400 border-gray-500/20"
                                        }`}>
                                            {exec.status === "RUNNING" && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />}
                                            <span className="capitalize">{exec.status.toLowerCase()}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-gray-400">
                                                <span className="material-symbols-outlined text-lg">account_tree</span>
                                            </div>
                                            <span className="font-medium text-white">{exec.workflow.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                        {exec.triggeredBy?.name || exec.triggeredBy?.email || "System"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-mono">
                                        {formatDuration(exec.startedAt, exec.completedAt)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDistanceToNow(new Date(exec.createdAt), { addSuffix: true })}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                <div className="px-6 py-4 border-t border-white/10 bg-white/5 flex justify-between items-center">
                    <span className="text-xs text-gray-500">Showing {executions.length} runs</span>
                </div>
            </div>
        </div>
    );
}
