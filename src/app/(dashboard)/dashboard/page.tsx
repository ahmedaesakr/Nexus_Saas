import { prisma } from "@/lib/db";
import { getAuthContext } from "@/lib/server/auth-context";
import { redirect } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { DashboardRefreshButton } from "@/components/dashboard/DashboardRefreshButton";

export default async function DashboardPage() {
    const context = await getAuthContext();
    if (!context) {
        redirect("/login");
    }

    const { organizationId } = context;

    // Fetch Stats
    const activeWorkflows = await prisma.workflow.count({
        where: {
            organizationId,
            status: "ACTIVE"
        }
    });

    const totalExecutions = await prisma.execution.count({
        where: {
            workflow: { organizationId }
        }
    });

    const successfulExecutions = await prisma.execution.count({
        where: {
            workflow: { organizationId },
            status: "COMPLETED"
        }
    });

    const successRate = totalExecutions > 0
        ? Math.round((successfulExecutions / totalExecutions) * 100)
        : 0;

    // Fetch Recent Activity
    const recentActivity = await prisma.execution.findMany({
        where: {
            workflow: { organizationId }
        },
        orderBy: { createdAt: "desc" },
        take: 5,
        include: {
            workflow: true
        }
    });

    return (
        <div className="p-8 container animate-fade-in space-y-8">
            {/* Welcome Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                    <p className="text-gray-400">Overview of your automated workflows and agent performance.</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">
                        Organization: {context.organizationId === "mock-org-id" ? "Demo Org" : "Pro Plan"}
                    </span>
                    <DashboardRefreshButton />
                </div>
            </div>

            {/* KPI Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="p-6 rounded-2xl bg-[#0c1018] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-blue-400">account_tree</span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">Active Workflows</p>
                    <h3 className="text-3xl font-bold text-white">{activeWorkflows}</h3>
                </div>

                <div className="p-6 rounded-2xl bg-[#0c1018] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-amber-400">bolt</span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">Total Executions</p>
                    <h3 className="text-3xl font-bold text-white">{totalExecutions}</h3>
                </div>

                <div className="p-6 rounded-2xl bg-[#0c1018] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-green-400">check_circle</span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">Success Rate</p>
                    <h3 className="text-3xl font-bold text-white">{successRate}%</h3>
                </div>

                <div className="p-6 rounded-2xl bg-[#0c1018] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-purple-400">history</span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">Last Run</p>
                    <h3 className="text-lg font-bold text-white">
                        {recentActivity[0]?.createdAt
                            ? formatDistanceToNow(recentActivity[0].createdAt, { addSuffix: true })
                            : "Never"}
                    </h3>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart Area (Placeholder for now) */}
                <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0c1018] border border-white/10">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-white">Execution Volume</h3>
                        <p className="text-xs text-gray-500">Last 20 executions</p>
                    </div>
                    <div className="h-64 flex items-center justify-center text-gray-500 border border-dashed border-white/10 rounded-lg">
                        Chart Component Coming Soon
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="p-6 rounded-2xl bg-[#0c1018] border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        {recentActivity.map((execution) => (
                            <div key={execution.id} className="flex gap-4 group">
                                <div className="relative">
                                    <div className="w-px h-full bg-white/10 absolute top-2 left-1/2 -translate-x-1/2" />
                                    <div className={`w-2 h-2 rounded-full relative z-10 mt-2 ${execution.status === 'COMPLETED' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' :
                                            execution.status === 'RUNNING' ? 'bg-blue-500 animate-pulse' :
                                                execution.status === 'FAILED' ? 'bg-red-500' : 'bg-gray-500'
                                        }`} />
                                </div>
                                <div className="pb-2">
                                    <p className="text-sm font-medium text-white group-hover:text-primary transition-colors">
                                        {execution.workflow.name}
                                    </p>
                                    <p className="text-xs text-gray-500 mb-1 capitalize">
                                        {execution.status.toLowerCase()} • {formatDistanceToNow(execution.createdAt, { addSuffix: true })}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {recentActivity.length === 0 && (
                            <p className="text-sm text-gray-500">No activity yet.</p>
                        )}
                    </div>
                    <Link href="/executions" className="w-full mt-4 py-2 text-xs font-medium text-gray-400 hover:text-white border border-white/5 hover:bg-white/5 rounded-lg transition-all flex items-center justify-center">
                        View Execution Log
                    </Link>
                </div>
            </div>
        </div>
    );
}
