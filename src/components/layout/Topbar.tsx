"use client";

import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const NAV_LABELS: Record<string, string> = {
  "/dashboard": "Mission Control",
  "/dashboard/workspace": "Project Workspace",
  "/dashboard/data": "Data Command",
  "/dashboard/onboarding": "Everboarding Hub",
  "/dashboard/settings": "System Settings",
};

export function Topbar() {
  const pathname = usePathname();
  const label = NAV_LABELS[pathname] ?? "Nexus";

  return (
    <div className="layout-topbar">
      {/* Breadcrumb */}
      <div className="topbar-breadcrumb" style={{ flex: 1 }}>
        <span style={{ color: "#555", fontSize: 12 }}>Nexus</span>
        <span style={{ color: "#333" }}>/</span>
        <span className="current">{label}</span>
      </div>

      {/* Search */}
      <div className="topbar-search" style={{ width: 200 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <span style={{ flex: 1 }}>Search system...</span>
        <kbd>⌘K</kbd>
      </div>

      {/* Icons */}
      <div style={{ display: "flex", alignItems: "center", gap: 2, marginLeft: 8 }}>
        <button className="topbar-icon-btn" title="Terminal">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
          </svg>
        </button>
        <button className="topbar-icon-btn" title="Alerts">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </button>
        <button className="topbar-icon-btn" title="Help">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </button>
        <div className="topbar-avatar" style={{ marginLeft: 6 }}>AC</div>
      </div>
    </div>
  );
}
