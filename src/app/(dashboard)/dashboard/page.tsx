import { prisma } from "@/lib/db";
import { getAuthContext } from "@/lib/server/auth-context";
import { redirect } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

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
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 heading-font mb-2">Dashboard</h1>
                    <p className="text-gray-400 font-medium">Overview of your automated workflows and agent performance.</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">
                        Organization: {context.organizationId === "mock-org-id" ? "Demo Org" : "Pro Plan"}
                    </span>
                    <a href="/dashboard" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                        <span className="material-symbols-outlined">refresh</span>
                    </a>
                </div>
            </div>

            {/* KPI Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="p-6 rounded-2xl bg-[#0A0D14] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00E5FF]/20 to-[#00B8CC]/20 flex items-center justify-center border border-[#00E5FF]/30 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                            <span className="material-symbols-outlined text-[#00E5FF] text-lg">account_tree</span>
                        </div>
                    </div>
                    <p className="text-sm font-medium text-gray-400 mb-1">Active Workflows</p>
                    <h3 className="text-4xl font-bold text-white heading-font">{activeWorkflows}</h3>
                </div>

                <div className="p-6 rounded-2xl bg-[#0A0D14] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-amber-400">bolt</span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">Total Executions</p>
                    <h3 className="text-3xl font-bold text-white">{totalExecutions}</h3>
                </div>

                <div className="p-6 rounded-2xl bg-[#0A0D14] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#34C759]/20 to-[#30d158]/20 flex items-center justify-center border border-[#34C759]/30 shadow-[0_0_15px_rgba(52,199,89,0.2)]">
                            <span className="material-symbols-outlined text-[#34C759] text-lg">check_circle</span>
                        </div>
                    </div>
                    <p className="text-sm font-medium text-gray-400 mb-1">Success Rate</p>
                    <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 heading-font">{successRate}%</h3>
                </div>

                <div className="p-6 rounded-2xl bg-[#0A0D14] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF3B30]/20 to-[#FF9500]/20 flex items-center justify-center border border-[#FF9500]/30 shadow-[0_0_15px_rgba(255,59,48,0.2)]">
                            <span className="material-symbols-outlined text-[#FF9500] text-lg">history</span>
                        </div>
                    </div>
                    <p className="text-sm font-medium text-gray-400 mb-1">Last Run</p>
                    <h3 className="text-2xl font-bold text-white heading-font">
                        {recentActivity[0]?.createdAt
                            ? formatDistanceToNow(recentActivity[0].createdAt, { addSuffix: true })
                            : "Never"}
                    </h3>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart Area (Placeholder for now) */}
                <div className="lg:col-span-2 p-6 rounded-3xl bg-[#0A0D14] border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-white heading-font">Execution Volume</h3>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Last 20 executions</p>
                    </div>
                    <div className="h-64 border border-dashed border-white/5 rounded-2xl relative overflow-hidden group p-6 flex items-end gap-2">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#00E5FF]/5 to-transparent pointer-events-none" />
                        <div className="flex-1 skeleton h-[40%] rounded-t-lg" style={{ animationDelay: '0ms' } as any} />
                        <div className="flex-1 skeleton h-[60%] rounded-t-lg" style={{ animationDelay: '100ms' } as any} />
                        <div className="flex-1 skeleton h-[45%] rounded-t-lg" style={{ animationDelay: '200ms' } as any} />
                        <div className="flex-1 skeleton h-[80%] rounded-t-lg" style={{ animationDelay: '300ms' } as any} />
                        <div className="flex-1 skeleton h-[55%] rounded-t-lg" style={{ animationDelay: '400ms' } as any} />
                        <div className="flex-1 skeleton h-[90%] rounded-t-lg" style={{ animationDelay: '500ms' } as any} />
                        <div className="flex-1 skeleton h-[70%] rounded-t-lg" style={{ animationDelay: '600ms' } as any} />
                        <div className="flex-1 skeleton h-[40%] rounded-t-lg" style={{ animationDelay: '700ms' } as any} />
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                               <span className="text-xs font-bold text-white uppercase tracking-widest">Chart Coming Soon</span>
                           </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="p-6 rounded-3xl bg-[#0A0D14] border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                    <h3 className="text-xl font-bold text-white mb-6 heading-font">Recent Activity</h3>
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
