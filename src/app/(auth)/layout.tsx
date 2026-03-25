import Link from "next/link";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="app-shell min-h-screen grid lg:grid-cols-2 text-white font-sans">
            <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden border-r border-white/5">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/18 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[140px] translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
                        <div className="brand-mark w-10 h-10 rounded-xl flex items-center justify-center">
                            <span className="material-symbols-outlined text-lg">dataset</span>
                        </div>
                        Nexus Flow
                    </Link>
                    <div className="mt-20">
                        <h1 className="text-5xl font-bold leading-tight mb-6 tracking-tight">
                            Command every workflow from one intelligent control plane.
                        </h1>
                        <p className="text-xl text-gray-400 max-w-md leading-relaxed">
                            Deploy agents, orchestrate integrations, and monitor execution from a premium operating layer built for modern automation teams.
                        </p>
                    </div>
                </div>

                <div className="relative z-10">
                    <div className="liquid-glass liquid-glass-elevated p-8 max-w-md rounded-[28px]">
                        <div className="flex gap-1 mb-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <span key={i} className="material-symbols-outlined text-primary text-sm">star</span>
                            ))}
                        </div>
                        <p className="text-lg font-medium mb-6 leading-relaxed">
                            &quot;Nexus Flow gave us an operator-grade workflow layer. The product feels premium, but the real win is how quickly our automations became reliable.&quot;
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full brand-mark flex items-center justify-center font-bold text-lg">AC</div>
                            <div>
                                <p className="font-semibold text-white">Alex Chen</p>
                                <p className="text-sm text-gray-400">Head of Automation</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center p-8 relative">
                <div className="absolute top-0 right-0 p-8">
                    <Link href="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                        Back to Home
                    </Link>
                </div>
                <div className="w-full max-w-md space-y-8 animate-fade-in delay-100">
                    {children}
                </div>
            </div>
        </div>
    );
}
