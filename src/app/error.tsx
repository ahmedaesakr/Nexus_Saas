"use client";

import { useEffect } from "react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Global error:", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-[#050a14] flex flex-col items-center justify-center text-center px-6">
            {/* Glowing orb background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-lg">
                <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-red-400 text-3xl">error</span>
                </div>
                <h1 className="text-2xl font-bold text-white mb-3">
                    Something went wrong
                </h1>
                <p className="text-gray-400 mb-8 leading-relaxed">
                    An unexpected error occurred. Our team has been notified.
                    You can try again or return to the dashboard.
                </p>
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={reset}
                        className="px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl shadow-[0_0_20px_rgba(13,89,242,0.3)] hover:shadow-[0_0_30px_rgba(13,89,242,0.5)] transition-all"
                    >
                        Try Again
                    </button>
                    <a
                        href="/dashboard"
                        className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 transition-all"
                    >
                        Dashboard
                    </a>
                </div>
            </div>
        </div>
    );
}
