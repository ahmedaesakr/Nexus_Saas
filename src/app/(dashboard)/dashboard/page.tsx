"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface Workflow {
    id: string;
    name: string;
    status: string;
    _count: { executions: number };
}

interface Execution {
    id: string;
    status: string;
    createdAt: string;
    startedAt: string | null;
    completedAt: string | null;
    workflow: { id: string; name: string };
}

interface BillingUsage {
    plan: string;
    usage: {
        workflows: { current: number; limit: number | null };
        agents: { current: number; limit: number | null };
        monthlyExecutions: { current: number; limit: number | null };
    };
}

export default function DashboardPage() {
    const [workflows, setWorkflows] = useState<Workflow[]>([]);
    const [executions, setExecutions] = useState<Execution[]>([]);
    const [billing, setBilling] = useState<BillingUsage | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [wfRes, exRes, blRes] = await Promise.all([
                    fetch("/api/workflows"),
                    fetch("/api/executions"),
                    fetch("/api/billing/usage"),
                ]);

                if (wfRes.ok) setWorkflows(await wfRes.json());
                if (exRes.ok) setExecutions(await exRes.json());
                if (blRes.ok) setBilling(await blRes.json());
            } catch (error) {
                console.error("Failed to load dashboard data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const activeWorkflows = workflows.filter((w) => w.status === "ACTIVE").length;
    const totalExecutions = executions.length;
    const completedExecutions = executions.filter((e) => e.status === "COMPLETED").length;
    const successRate = totalExecutions > 0 ? ((completedExecutions / totalExecutions) * 100).toFixed(1) : "0";

    // Compute execution volume for last 7 days
    const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const now = new Date();
    const dayBuckets = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(now);
        d.setDate(d.getDate() - (6 - i));
        return d;
    });

    const volumeData = dayBuckets.map((day) => {
        const count = executions.filter((e) => {
            const created = new Date(e.createdAt);
            return created.toDateString() === day.toDateString();
        }).length;
        return count;
    });
    const maxVolume = Math.max(...volumeData, 1);

    const recentExecutions = executions.slice(0, 5);

    if (loading) {
        return (
            <div className="p-8 container animate-fade-in space-y-8">
                <div className="h-8 w-48 bg-white/5 rounded animate-pulse" />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-32 rounded-2xl bg-white/5 animate-pulse" />
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 h-80 rounded-2xl bg-white/5 animate-pulse" />
                    <div className="h-80 rounded-2xl bg-white/5 animate-pulse" />
                </div>
            </div>
        );
    }

    const stats = [
        { label: "Active Workflows", value: String(activeWorkflows), icon: "account_tree", color: "text-blue-400", bg: "bg-blue-500/20" },
        { label: "Total Executions", value: String(totalExecutions), icon: "bolt", color: "text-amber-400", bg: "bg-amber-500/20" },
        { label: "Success Rate", value: `${successRate}%`, icon: "check_circle", color: "text-green-400", bg: "bg-green-500/20" },
        { label: "Agents", value: String(billing?.usage.agents.current ?? 0), icon: "psychology", color: "text-purple-400", bg: "bg-purple-500/20" },
    ];

    return (
        <div className="p-8 container animate-fade-in space-y-8">
            {/* Welcome Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                    <p className="text-gray-400">Overview of your automated workflows and agent performance.</p>
                </div>
            </div>

            {/* KPI Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-[#0c1018] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                                <span className={`material-symbols-outlined ${stat.color}`}>{stat.icon}</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                        <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Execution Volume Chart */}
                <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0c1018] border border-white/10">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-white">Execution Volume</h3>
                        <span className="text-xs text-gray-500">Last 7 days</span>
                    </div>
                    <div className="h-64 flex items-end gap-3 px-2">
                        {volumeData.map((count, i) => (
                            <div key={i} className="flex-1 group relative">
                                <div
                                    className="w-full bg-primary/20 hover:bg-primary/40 rounded-t-sm transition-all relative overflow-hidden"
                                    style={{ height: `${Math.max((count / maxVolume) * 100, 4)}%` }}
                                >
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-primary/50" />
                                </div>
                                <div className="text-center text-[10px] text-gray-600 mt-2">
                                    {dayLabels[dayBuckets[i].getDay() === 0 ? 6 : dayBuckets[i].getDay() - 1]}
                                </div>
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                    {count} runs
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="p-6 rounded-2xl bg-[#0c1018] border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        {recentExecutions.length === 0 ? (
                            <p className="text-sm text-gray-500 text-center py-8">No executions yet</p>
                        ) : (
                            recentExecutions.map((exec) => (
                                <div key={exec.id} className="flex gap-4 group">
                                    <div className="relative">
                                        <div className="w-px h-full bg-white/10 absolute top-2 left-1/2 -translate-x-1/2" />
                                        <div className={`w-2 h-2 rounded-full relative z-10 mt-2 ${
                                            exec.status === "COMPLETED" ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" :
                                            exec.status === "RUNNING" ? "bg-blue-500 animate-pulse" :
                                            exec.status === "FAILED" ? "bg-red-500" :
                                            "bg-gray-500"
                                        }`} />
                                    </div>
                                    <div className="pb-2">
                                        <p className="text-sm font-medium text-white group-hover:text-primary transition-colors">
                                            {exec.workflow.name}
                                        </p>
                                        <p className="text-xs text-gray-500 mb-1 capitalize">{exec.status.toLowerCase()}</p>
                                        <span className="text-[10px] text-gray-600">
                                            {formatDistanceToNow(new Date(exec.createdAt), { addSuffix: true })}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <Link
                        href="/executions"
                        className="w-full mt-4 py-2 text-xs font-medium text-gray-400 hover:text-white border border-white/5 hover:bg-white/5 rounded-lg transition-all block text-center"
                    >
                        View Execution Log
                    </Link>
                </div>
            </div>
        </div>
    );
}
