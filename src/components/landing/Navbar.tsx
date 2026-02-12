"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: "Features", href: "#features" },
        { label: "Solutions", href: "/#solutions" }, // Use absolute path for cross-page nav if needed
        { label: "Pricing", href: "/#pricing" },
        { label: "Templates", href: "/templates" }, // Link to actual page
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled
                ? "bg-[#050a14]/80 backdrop-blur-md border-white/10 py-3"
                : "bg-transparent border-transparent py-5"
                }`}
        >
            <div className="container flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter group">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(13,89,242,0.5)] group-hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-white">dataset</span>
                    </div>
                    <span>Nexus Flow</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="hover:text-white transition-colors relative group"
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <Link
                        href="/login"
                        className="hidden md:block text-sm font-medium text-gray-400 hover:text-white transition-colors"
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/signup"
                        className="hidden md:block px-5 py-2.5 bg-white text-black rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors btn-tactile shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    >
                        Start Free Trial
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-gray-300 hover:text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileMenuOpen}
                    >
                        <span className="material-symbols-outlined text-2xl">
                            {mobileMenuOpen ? "close" : "menu"}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#050a14] border-b border-white/10 overflow-hidden"
                    >
                        <div className="container py-6 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-lg font-medium text-gray-300 hover:text-white py-2 border-b border-white/5"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="flex flex-col gap-3 mt-4">
                                <Link
                                    href="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full py-3 text-center text-gray-300 hover:text-white border border-white/10 rounded-xl"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/signup"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full py-3 text-center bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20"
                                >
                                    Start Free Trial
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
