"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function DashboardRefreshButton() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    return (
        <button
            onClick={handleRefresh}
            disabled={isPending}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
            aria-label="Refresh dashboard data"
            title="Refresh dashboard data"
        >
            <span
                className={`material-symbols-outlined block transition-transform ${
                    isPending ? "animate-spin" : "group-hover:rotate-180"
                }`}
            >
                refresh
            </span>
        </button>
    );
}
