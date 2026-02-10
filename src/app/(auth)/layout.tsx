import Link from "next/link";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-background-dark text-white font-sans">
            {/* Left: Branding & Visuals */}
            <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden bg-[#02040a]">
                {/* Background Effects */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(13,89,242,0.5)]">
                            <span className="material-symbols-outlined text-white">dataset</span>
                        </div>
                        Nexus Flow
                    </Link>
                    <div className="mt-20">
                        <h1 className="text-5xl font-bold leading-tight mb-6 tracking-tight">Automate Work.<br />Amplify Teams.</h1>
                        <p className="text-xl text-gray-400 max-w-md leading-relaxed">Let intelligent AI agents handle your repetitive workflows so you can focus on strategy.</p>
                    </div>
                </div>

                <div className="relative z-10">
                    {/* Testimonial */}
                    <div className="liquid-glass p-8 max-w-md border border-white/10 backdrop-blur-xl bg-white/5 rounded-3xl">
                        <div className="flex gap-1 mb-4">
                            {[1, 2, 3, 4, 5].map(i => (
                                <span key={i} className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                            ))}
                        </div>
                        <p className="text-lg font-medium mb-6 leading-relaxed">"Nexus Flow completely transformed how we handle sales ops. It feels like magic."</p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">AC</div>
                            <div>
                                <p className="font-semibold text-white">Alex Chen</p>
                                <p className="text-sm text-gray-400">VP of Operations</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Content */}
            <div className="flex items-center justify-center p-8 bg-background-dark relative">
                <div className="absolute top-0 right-0 p-8">
                    <Link href="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                        Back to Home
                    </Link>
                </div>
                <main id="main-content" className="w-full max-w-md space-y-8 animate-fade-in delay-100">
                    {children}
                </main>
            </div>
        </div>
    );
}
