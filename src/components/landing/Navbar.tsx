"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "../ui/Icons";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: "Features", href: "#features" },
        { label: "Solutions", href: "/#solutions" },
        { label: "Pricing", href: "/#pricing" },
        { label: "Templates", href: "/templates" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled
                ? "liquid-glass py-3 border-transparent"
                : "bg-transparent border-transparent py-5"
                }`}
        >
            <div className="container flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter group">
                    <div className="brand-mark w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Icons.Logo className="w-6 h-6 text-black" />
                    </div>
                    <span>Nexus Flow</span>
                </Link>

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
                        href="/dashboard"
                        className="hidden md:block text-sm font-medium text-gray-400 hover:text-white transition-colors"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/signup"
                        className="hidden md:inline-flex primary-button px-5 py-2.5 text-sm"
                    >
                        Start Free Trial
                    </Link>

                    <button
                        className="md:hidden p-2 text-gray-300 hover:text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {mobileMenuOpen ? (
                            <Icons.Close className="w-6 h-6" />
                        ) : (
                            <Icons.Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#070a07]/95 border-b border-white/10 overflow-hidden backdrop-blur-xl"
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
                                    href="/dashboard"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="secondary-button w-full py-3 text-center"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/signup"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="primary-button w-full py-3 text-center"
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
