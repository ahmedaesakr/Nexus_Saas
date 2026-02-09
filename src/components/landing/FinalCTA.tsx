"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function FinalCTA() {
    return (
        <section className="py-32 relative z-10 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/20 pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/30 blur-[120px] rounded-full pointer-events-none" />

            <div className="container relative text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                        Ready to Start Your <br />
                        <span className="gradient-text">Automation Journey?</span>
                    </h2>
                    <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                        Join thousands of forward-thinking teams using Nexus Flow to
                        work smarter, not harder. Start for free today.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/signup"
                            className="px-8 py-4 bg-white text-black rounded-xl text-lg font-bold hover:bg-gray-100 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-all btn-tactile w-full sm:w-auto"
                        >
                            Start Free Trial
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-white/5 text-white rounded-xl text-lg font-bold hover:bg-white/10 border border-white/10 backdrop-blur-sm transition-all w-full sm:w-auto"
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
