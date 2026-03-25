"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function FinalCTA() {
    return (
        <section className="py-32 relative z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/12 pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/24 blur-[120px] rounded-full pointer-events-none" />

            <div className="container relative text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="w-full max-w-4xl mx-auto px-4 liquid-glass liquid-glass-elevated py-14 rounded-[32px]"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight heading-font">
                        Ready to move from manual ops to <br />
                        <span className="gradient-text">continuous execution?</span>
                    </h2>
                    <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
                        Launch your workspace, connect your systems, and let Nexus Flow run the repetitive layer with operator-grade visibility.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/signup"
                            className="primary-button px-8 py-4 text-lg w-full sm:w-auto"
                        >
                            Start Free Trial
                        </Link>
                        <Link
                            href="/contact"
                            className="secondary-button px-8 py-4 text-lg font-bold w-full sm:w-auto"
                        >
                            Talk to Sales
                        </Link>
                    </div>
                    <p className="mt-6 text-sm text-gray-500">
                        No credit card required • 14-day free trial • Cancel anytime
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
