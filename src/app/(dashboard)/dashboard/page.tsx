import Link from "next/link";

const STATS = [
  { label: "Critical Alerts", value: "2", sub: "Unresolved", color: "#ef4444", dot: "red" },
  { label: "Warnings", value: "5", sub: "Pending", color: "#eab308", dot: "yellow" },
  { label: "Healthy States", value: "28", sub: "Active", color: "#4ade80", dot: "green" },
  { label: "CPU Load", value: "92%", sub: "+12% vs last hour", color: "#f0f0f0", dot: "green" },
];

const PROJECTS = [
  {
    name: "Project Helios",
    desc: "Core infrastructure deployment",
    status: "OPERATIONAL",
    statusColor: "green",
    progress: 78,
  },
  {
    name: "Aethelgard Network",
    desc: "P2P node synchronization layer",
    status: "STABILIZING",
    statusColor: "yellow",
    progress: 44,
  },
  {
    name: "Obsidian Protocol",
    desc: "End-to-end encryption audit",
    status: "ATTENTION",
    statusColor: "red",
    progress: 22,
  },
];

const FOOTER_STATS = [
  { label: "STORAGE NODE 01", value: "8.4TB / 12TB" },
  { label: "ENCRYPTION ENGINE", value: "AES-256 Validated" },
  { label: "GLOBAL LATENCY", value: "Avg. 182ms" },
];

export default function DashboardPage() {
  return (
    <div style={{ maxWidth: 960 }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div className="section-eyebrow">SYSTEMS ONLINE</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 className="page-title">Mission Control</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 11, color: "#555" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span className="status-dot green" />
              API Status: Healthy
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span className="status-dot green" />
              DB Latency: 42ms
            </span>
          </div>
        </div>
      </div>

      {/* AI Insight Banner */}
      <div className="insight-banner" style={{ marginBottom: 20, display: "flex", gap: 20, alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: "#4ade80", marginBottom: 6 }}>
            ⚡ AI-DRIVEN INSIGHTS
          </div>
          <p style={{ fontSize: 13, color: "#ccc", margin: 0, lineHeight: 1.5 }}>
            Neural processing suggests optimizing project <strong style={{ color: "#f0f0f0" }}>"Aethelgard"</strong>. Estimated throughput increase:{" "}
            <strong style={{ color: "#4ade80" }}>14.2%.</strong>
          </p>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button className="btn btn-primary btn-sm">Apply Recommendation</button>
            <button className="btn btn-ghost btn-sm">Dismiss</button>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 200 }}>
          {STATS.slice(0, 3).map((s) => (
            <div
              key={s.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 6,
                padding: "8px 12px",
                cursor: "pointer",
              }}
            >
              <div>
                <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: s.color }}>{s.value} <span style={{ fontSize: 11, fontWeight: 400, color: "#888" }}>{s.sub}</span></div>
              </div>
              <span style={{ color: "#444", fontSize: 14 }}>›</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 16 }}>
        {/* Active Projects */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Active Projects</span>
            <Link href="/dashboard/workspace" style={{ fontSize: 11, color: "#4ade80" }}>View All →</Link>
          </div>
          <div style={{ padding: "4px 0" }}>
            {PROJECTS.map((p) => (
              <div
                key={p.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "12px 16px",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  cursor: "pointer",
                  transition: "background 150ms",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    flexShrink: 0,
                  }}
                >
                  ◈
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#f0f0f0", marginBottom: 2 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: "#666", marginBottom: 6, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.desc}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.06em", color: "#555" }}>STATUS</span>
                    <span
                      className={`badge badge-${p.statusColor}`}
                      style={{ fontSize: 9 }}
                    >
                      {p.status}
                    </span>
                  </div>
                  <div className="progress-bar" style={{ marginTop: 6 }}>
                    <div
                      className={`progress-fill ${p.statusColor === "red" ? "red" : p.statusColor === "yellow" ? "yellow" : ""}`}
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
            <div style={{ padding: "10px 16px" }}>
              <button className="btn btn-ghost btn-sm" style={{ width: "100%", justifyContent: "center", borderStyle: "dashed" }}>
                + New Project
              </button>
            </div>
          </div>
        </div>

        {/* CPU Load Panel */}
        <div className="card" style={{ display: "flex", flexDirection: "column" }}>
          <div className="card-header">
            <span className="card-title">CPU Load</span>
          </div>
          <div style={{ padding: 16, flex: 1 }}>
            {/* Bar chart */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 100, marginBottom: 12 }}>
              {[40, 55, 62, 48, 70, 58, 80, 75, 88, 92].map((v, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${v}%`,
                    background: i === 9 ? "#4ade80" : `rgba(74,222,128,${0.15 + i * 0.07})`,
                    borderRadius: "2px 2px 0 0",
                  }}
                />
              ))}
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.04em", color: "#f0f0f0" }}>92%</div>
              <div style={{ fontSize: 11, color: "#4ade80" }}>↑ +12% vs last hour</div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: 12 }}>
            {FOOTER_STATS.map((s) => (
              <div className="sys-bar" key={s.label}>
                <span style={{ letterSpacing: "0.05em", fontSize: 9 }}>{s.label}</span>
                <span style={{ color: "#888", fontSize: 11, fontWeight: 500 }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
