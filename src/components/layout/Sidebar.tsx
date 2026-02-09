"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: "grid_view" },
    { name: "Workflows", href: "/workflows", icon: "account_tree" },
    { name: "Agents", href: "/agents", icon: "psychology" },
    // { name: "Templates", href: "/templates", icon: "library_books" },
    { name: "Executions", href: "/executions", icon: "history" },
    { name: "Integrations", href: "/integrations", icon: "hub" },
    { name: "Team", href: "/users", icon: "group" },
    { name: "Settings", href: "/settings", icon: "settings" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 z-40 w-64 h-screen border-r border-white/10 bg-[#0c1018] flex flex-col">
            {/* Logo */}
            <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
                <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg text-white group">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(13,89,242,0.4)] group-hover:shadow-[0_0_25px_rgba(13,89,242,0.6)] transition-all">
                        <span className="material-symbols-outlined text-white text-lg">dataset</span>
                    </div>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 group-hover:to-white transition-colors">Nexus Flow</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto scrollbar-none">
                <div>
                    <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Platform</p>
                    <div className="space-y-1">
                        {navigation.slice(0, 4).map((item) => {
                            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                                        isActive
                                            ? "bg-primary text-white shadow-[0_0_20px_rgba(13,89,242,0.3)]"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    {isActive && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-50" />
                                    )}
                                    <span className={cn(
                                        "material-symbols-outlined text-[20px] transition-colors relative z-10",
                                        isActive ? "text-white" : "text-gray-500 group-hover:text-white"
                                    )}>
                                        {item.icon}
                                    </span>
                                    <span className="relative z-10">{item.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Configuration</p>
                    <div className="space-y-1">
                        {navigation.slice(4).map((item) => {
                            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                                        isActive
                                            ? "bg-primary text-white shadow-[0_0_20px_rgba(13,89,242,0.3)]"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <span className={cn(
                                        "material-symbols-outlined text-[20px] transition-colors relative z-10",
                                        isActive ? "text-white" : "text-gray-500 group-hover:text-white"
                                    )}>
                                        {item.icon}
                                    </span>
                                    <span className="relative z-10">{item.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </nav>

            {/* User Plan */}
            <div className="p-4 border-t border-white/10 bg-[#0c1018]">
                <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-white/10 relative overflow-hidden group hover:border-primary/30 transition-colors cursor-pointer">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors" />

                    <div className="flex items-center justify-between mb-2 relative z-10">
                        <span className="text-xs font-semibold text-white">Pro Plan</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/20 font-medium">Active</span>
                    </div>

                    <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden mb-2 relative z-10">
                        <div className="bg-gradient-to-r from-primary to-purple-500 h-full w-[75%] rounded-full shadow-[0_0_10px_rgba(13,89,242,0.5)]" />
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-gray-400 relative z-10">
                        <span>7,500 / 10k execs</span>
                        <span className="group-hover:text-white transition-colors">Upgrade</span>
                    </div>
                </div>

                {/* User Profile Mini */}
                <div className="mt-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 border border-white/10" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">Admin User</p>
                        <p className="text-xs text-gray-500 truncate">admin@nexusflow.app</p>
                    </div>
                    <button className="text-gray-500 hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-lg">logout</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}
