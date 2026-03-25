"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function HeroSection() {
    return (
        <section className="relative z-10 pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/12 blur-[140px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-400/10 blur-[140px]" />
                <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] bg-[url('/grid.svg')] opacity-[0.03]" />
            </div>

            <div className="container text-center max-w-5xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="eyebrow-chip px-4 py-2 text-sm font-medium mb-8 transition-colors cursor-default"
                >
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(140,255,75,0.9)]" />
                    Nexus Flow control layer is live
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 drop-shadow-2xl heading-font leading-tight px-4 w-full"
                >
                    Orchestrate Agents.
                    <br className="hidden md:block" />
                    <span className="gradient-text ml-0 md:ml-4">Control Execution.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed px-4"
                >
                    Build autonomous workflow systems that run around the clock.
                    Manage triggers, integrations, agents, and execution telemetry from one premium operating surface.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="/dashboard"
                        className="w-full sm:w-auto clay-button clay-button-primary text-lg px-8 py-4"
                    >
                        Enter Dashboard
                    </Link>
                    <button className="w-full sm:w-auto secondary-button px-8 py-4 text-lg font-bold group">
                        <span className="material-symbols-outlined group-hover:scale-110 transition-transform text-primary">play_circle</span>
                        Watch Walkthrough
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
