"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Icons } from "../ui/Icons";

const footerLinks = {
    Product: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Templates", href: "/templates" },
        { label: "Integrations", href: "/integrations" }
    ],
    Company: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" }
    ],
    Resources: [
        { label: "Documentation", href: "/docs" },
        { label: "API Reference", href: "/docs/api" },
        { label: "Community", href: "/community" },
        { label: "Status", href: "/status" }
    ],
    Legal: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Security", href: "/security" }
    ]
};

const SocialIcon = ({ name, Icon }: { name: string; Icon: any }) => (
    <a
        href="#"
        className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary hover:text-white text-gray-400 flex items-center justify-center transition-all group"
        aria-label={`Follow us on ${name}`}
    >
        <Icon className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
    </a>
);

export function EnhancedFooter() {
    return (
        <footer className="bg-[#02040a] border-t border-white/5 pt-20 pb-10 relative z-10">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter mb-6 group">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(13,89,242,0.5)] group-hover:scale-110 transition-transform">
                                <Icons.Logo className="w-6 h-6 text-white" />
                            </div>
                            <span>Nexus Flow</span>
                        </Link>
                        <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">
                            Automate your business workflows with intelligent AI agents.
                            Build, deploy, and scale without limits.
                        </p>
                        <div className="flex gap-4">
                            <SocialIcon name="Twitter" Icon={Icons.Twitter} />
                            <SocialIcon name="GitHub" Icon={Icons.GitHub} />
                            <SocialIcon name="Discord" Icon={Icons.Discord} />
                            <SocialIcon name="LinkedIn" Icon={Icons.LinkedIn} />
                        </div>
                    </div>

                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">
                                {category}
                            </h4>
                            <ul className="space-y-4">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-400 hover:text-primary transition-colors text-sm"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>© 2026 Nexus Flow Inc. All rights reserved.</p>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        All systems operational
                    </div>
                </div>
            </div>
        </footer>
    );
}
