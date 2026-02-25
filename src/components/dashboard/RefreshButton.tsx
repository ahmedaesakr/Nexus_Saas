"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function RefreshButton() {
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
            aria-label="Refresh dashboard"
            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed group touch-target"
        >
            <span
                className={`material-symbols-outlined transition-transform duration-700 ${isPending ? "animate-spin" : "group-hover:rotate-180"}`}
                aria-hidden="true"
            >
                refresh
            </span>
        </button>
    );
}
