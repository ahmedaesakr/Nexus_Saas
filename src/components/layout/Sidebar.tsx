"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const NAV_ITEMS = [
  { label: "Mission Control", href: "/dashboard", icon: "⊞" },
  { label: "Project Workspace", href: "/dashboard/workspace", icon: "⊟" },
  { label: "Data Command", href: "/dashboard/data", icon: "⊠" },
  { label: "Everboarding Hub", href: "/dashboard/onboarding", icon: "⊡" },
  { label: "System Settings", href: "/dashboard/settings", icon: "⚙" },
];

const BOTTOM_ITEMS = [
  { label: "Support", href: "/dashboard/support", icon: "?" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="layout-sidebar">
      {/* Logo */}
      <div className="sidenav-logo">
        <div className="sidenav-logo-mark">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <rect x="1" y="1" width="4" height="4" fill="#000" />
            <rect x="7" y="1" width="4" height="4" fill="#000" />
            <rect x="1" y="7" width="4" height="4" fill="#000" />
            <rect x="7" y="7" width="4" height="4" fill="#000" opacity="0.5" />
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#f0f0f0" }}>Nexus</div>
          <div style={{ fontSize: 9, color: "#555", letterSpacing: "0.08em", textTransform: "uppercase" }}>Silent Authority</div>
        </div>
      </div>

      {/* Nav */}
      <div style={{ flex: 1, overflowY: "auto", paddingTop: 8 }}>
        <div className="sidenav-section-label">Navigation</div>
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} className={`sidenav-item ${active ? "active" : ""}`}>
              <span style={{ fontSize: 13, lineHeight: 1, fontFamily: "monospace" }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}

        <div className="sidenav-new-btn" onClick={() => {}}>
          <span style={{ fontSize: 16, lineHeight: 1 }}>+</span>
          New Project
        </div>
      </div>

      {/* Bottom */}
      <div className="sidenav-bottom">
        {BOTTOM_ITEMS.map((item) => (
          <Link key={item.href} href={item.href} className={`sidenav-item ${pathname === item.href ? "active" : ""}`}>
            <span style={{ fontSize: 13 }}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="sidenav-item"
          style={{ background: "none", border: "none", cursor: "pointer", width: "100%", textAlign: "left" }}
        >
          <span style={{ fontSize: 12, opacity: 0.6 }}>⬡</span>
          Logout
        </button>
      </div>
    </aside>
  );
}
