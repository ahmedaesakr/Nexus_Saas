"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Templates", "Changelog"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Blog", "Community", "Support"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Contact"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Cookies", "License"],
  },
];

export function Footer() {
  return (
    <footer className="py-20 px-6 border-t border-white/5 font-['Instrument_Sans']">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
              </svg>
              <span className="text-xl font-bold tracking-tighter">Nexus</span>
            </div>
            <p className="text-white/40 text-sm max-w-xs leading-relaxed">
              Build premium, SEO-optimized websites in seconds with the world's most advanced AI website builder.
            </p>
          </div>

          {FOOTER_LINKS.map((section, idx) => (
            <div key={idx}>
              <h4 className="text-sm font-semibold mb-6">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link href="#" className="text-sm text-white/40 hover:text-white/70 transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-xs text-white/20">
            © 2026 Nexus Systems Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-white/20 hover:text-white/50 transition-colors">
              <Github className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-white/20 hover:text-white/50 transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-white/20 hover:text-white/50 transition-colors">
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
