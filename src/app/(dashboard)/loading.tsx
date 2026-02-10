export default function DashboardLoading() {
    return (
        <div className="p-8 space-y-8 animate-pulse">
            {/* Header skeleton */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="h-8 w-64 bg-white/5 rounded-lg mb-2" />
                    <div className="h-4 w-96 bg-white/5 rounded-lg" />
                </div>
                <div className="h-10 w-32 bg-white/5 rounded-xl" />
            </div>

            {/* KPI cards skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-white/5" />
                            <div className="h-4 w-24 bg-white/5 rounded" />
                        </div>
                        <div className="h-8 w-20 bg-white/5 rounded-lg mb-2" />
                        <div className="h-3 w-32 bg-white/5 rounded" />
                    </div>
                ))}
            </div>

            {/* Content area skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 h-80 rounded-2xl border border-white/5 bg-white/[0.02]" />
                <div className="h-80 rounded-2xl border border-white/5 bg-white/[0.02]">
                    <div className="p-6 space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white/5" />
                                <div className="flex-1">
                                    <div className="h-4 w-3/4 bg-white/5 rounded mb-1" />
                                    <div className="h-3 w-1/2 bg-white/5 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
