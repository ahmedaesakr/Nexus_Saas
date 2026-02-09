import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Analytics',
    description: 'View comprehensive analytics and insights about your digital assets, team usage, and engagement metrics.',
    alternates: {
        canonical: '/analytics',
    },
};

export default function AnalyticsPage() {
    return (
        <div className="p-8 animate-fade-in">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Charts and reporting coming soon.</p>
            </div>

            {/* Placeholder Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="h-48 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center hover-lift"
                    >
                        <div className="text-center">
                            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center">
                                <span className="material-symbols-outlined text-gray-400">analytics</span>
                            </div>
                            <p className="text-sm text-gray-500">Chart {i}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
