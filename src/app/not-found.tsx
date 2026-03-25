import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "404 - Page Not Found | Nexus Flow",
    description: "The page you're looking for doesn't exist or has been moved.",
};

export default function NotFound() {
    return (
        <div className="app-shell min-h-screen flex flex-col items-center justify-center text-center px-6">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px]" />
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
                        className="primary-button px-6 py-3 rounded-xl"
                    >
                        Go Home
                    </Link>
                    <Link
                        href="/dashboard"
                        className="secondary-button px-6 py-3 font-medium rounded-xl"
                    >
                        Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
