import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Analytics',
    description: 'View comprehensive analytics and insights about your execution history, AI token usage, and time saved.',
    alternates: {
        canonical: '/analytics',
    },
};

export default function AnalyticsPage() {
    return (
        <div className="container py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
                <p className="text-gray-400">Monitor your workflow performance and usage.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-[#0c1018] border border-white/10 rounded-xl p-6 animate-pulse">
                        <div className="h-4 w-24 bg-white/5 rounded mb-4" />
                        <div className="h-8 w-16 bg-white/10 rounded" />
                    </div>
                ))}
            </div>

            <div className="bg-[#0c1018] border border-white/10 rounded-xl p-12 text-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-3xl text-gray-500">bar_chart</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Advanced Analytics Coming Soon</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                    We&apos;re building detailed insights into your execution history, AI token usage, and time saved.
                    Stay tuned for updates.
                </p>
            </div>
        </div>
    );
}
