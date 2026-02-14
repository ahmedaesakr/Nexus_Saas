import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "404 — Page Not Found | Nexus Flow",
    description: "The page you're looking for doesn't exist or has been moved.",
};

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#050a14] flex flex-col items-center justify-center text-center px-6">
            {/* Glowing orb background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-lg">
                <p className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 mb-4">
                    404
                </p>
                <h1 className="text-2xl font-bold text-white mb-3">
                    Page not found
                </h1>
                <p className="text-gray-400 mb-8 leading-relaxed">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    Let&apos;s get you back on track.
                </p>
                <div className="flex items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl shadow-[0_0_20px_rgba(13,89,242,0.3)] hover:shadow-[0_0_30px_rgba(13,89,242,0.5)] transition-all"
                    >
                        Go Home
                    </Link>
                    <Link
                        href="/dashboard"
                        className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 transition-all"
                    >
                        Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
