"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Icons } from "../ui/Icons";

export function HeroSection() {
    return (
        <section className="relative z-10 pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            {/* ... */}

            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]" />
                <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] bg-[url('/grid.svg')] opacity-[0.03]" />
            </div>

            <div className="container text-center max-w-5xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300 mb-8 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default"
                >
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
                    Aura 2.0 is now live
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 drop-shadow-2xl heading-font leading-tight px-4 w-full"
                >
                    Automate Work.
                    <br className="hidden md:block" />
                    <span className="gradient-text ml-0 md:ml-4">Amplify Teams.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed px-4"
                >
                    Build AI-powered workflows that run 24/7. From sales follow-ups to
                    customer onboarding—let intelligent agents handle the repetitive work.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="/dashboard"
                        className="w-full sm:w-auto clay-button clay-button-primary text-lg"
                    >
                        Enter Dashboard
                    </Link>
                    <button className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white rounded-xl text-lg font-bold hover:bg-white/10 border border-white/10 backdrop-blur-sm transition-all flex items-center justify-center gap-2 group hover:-translate-y-1">
                        <span className="material-symbols-outlined group-hover:scale-110 transition-transform text-primary">play_circle</span>
                        Watch Demo
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
