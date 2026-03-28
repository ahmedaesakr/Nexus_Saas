export default function SettingsPage() {
  return (
    <div style={{ maxWidth: 860 }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div className="section-eyebrow">CONFIGURATION</div>
        <h1 className="page-title">System Settings</h1>
        <p style={{ fontSize: 12, color: "#555", marginTop: 4 }}>
          Configure your environment, manage security protocols, and adjust notification thresholds for the Nexus ecosystem.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 20 }}>
        {/* Settings Nav */}
        <div>
          {/* Profile card */}
          <div className="card" style={{ padding: 16, marginBottom: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: "#4ade80",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#000",
                }}
              >
                AC
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Alex Chen</div>
                <div style={{ fontSize: 11, color: "#555" }}>System Administrator</div>
              </div>
              <button className="btn btn-secondary btn-sm" style={{ width: "100%", justifyContent: "center" }}>Edit Profile</button>
            </div>
          </div>

          {/* Nav links */}
          <div className="card">
            {[
              { label: "Account Details", active: true },
              { label: "Security & Keys" },
              { label: "Integrations" },
              { label: "Notifications" },
              { label: "Billing & Plans" },
            ].map((item, i, arr) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  cursor: "pointer",
                  background: item.active ? "rgba(74,222,128,0.05)" : "transparent",
                  color: item.active ? "#4ade80" : "#888",
                  fontSize: 12,
                  fontWeight: item.active ? 600 : 400,
                  transition: "background 150ms, color 150ms",
                }}
                onMouseEnter={(e) => {
                  if (!item.active) e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                }}
                onMouseLeave={(e) => {
                  if (!item.active) e.currentTarget.style.background = "transparent";
                }}
              >
                {item.label}
                <span style={{ fontSize: 12 }}>›</span>
              </div>
            ))}
          </div>

          {/* System integrity */}
          <div className="card" style={{ marginTop: 12, padding: "12px 14px" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: "#555", marginBottom: 10 }}>SYSTEM INTEGRITY</div>
            {[
              { label: "API Latency", value: "12ms", color: "green", w: "90%" },
              { label: "Encrypted Storage", value: "86%", color: "yellow", w: "86%" },
            ].map((s) => (
              <div key={s.label} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
                  <span style={{ color: "#666" }}>{s.label}</span>
                  <span style={{ color: "#888" }}>{s.value}</span>
                </div>
                <div className="progress-bar">
                  <div className={`progress-fill ${s.color !== "green" ? s.color : ""}`} style={{ width: s.w }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Notifications */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">Notification Preferences</span>
            </div>
            <div style={{ padding: "4px 0" }}>
              {[
                {
                  title: "Critical System Alerts",
                  desc: "Immediate alerts for server outages or security breaches.",
                  on: true,
                },
                {
                  title: "Weekly Activity Report",
                  desc: "A consolidated summary of past milestones and team performance.",
                  on: false,
                },
                {
                  title: "Direct Messages",
                  desc: "Push notifications for shared Monolith workspace communications.",
                  on: true,
                },
              ].map((item, i, arr) => (
                <div
                  key={item.title}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 16,
                    padding: "14px 16px",
                    borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#d0d0d0", marginBottom: 3 }}>{item.title}</div>
                    <div style={{ fontSize: 11, color: "#555" }}>{item.desc}</div>
                  </div>
                  <div className={`toggle ${item.on ? "on" : ""}`} style={{ flexShrink: 0, marginTop: 2 }} />
                </div>
              ))}
            </div>
          </div>

          {/* Integrations */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">Connected Integrations</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
              {[
                { name: "Data Warehouse", desc: "Synchronizes live databases with global cloud storage nodes.", status: "ACTIVE", action: "Manage Connection →" },
                { name: "GitHub Forge", desc: "Automates repository deployments directly from the Monolith terminal.", status: "ERROR", action: "Link Account →" },
              ].map((item, i, arr) => (
                <div
                  key={item.name}
                  style={{
                    padding: "14px 16px",
                    borderRight: i === 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 6,
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                      }}
                    >
                      ⊟
                    </div>
                    <span className={`badge ${item.status === "ACTIVE" ? "badge-green" : "badge-red"}`} style={{ fontSize: 9 }}>
                      {item.status}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#d0d0d0", marginBottom: 4 }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: "#555", marginBottom: 10 }}>{item.desc}</div>
                  <a href="#" style={{ fontSize: 11, color: "#4ade80" }}>{item.action}</a>
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">Security Protocol</span>
              <span style={{ fontSize: 10, color: "#ef4444", fontWeight: 600 }}>⚠ Action Required</span>
            </div>
            <div style={{ padding: "4px 0" }}>
              {[
                { icon: "⊕", label: "Two-Factor Authentication", action: <button className="btn btn-secondary btn-sm">Enable</button> },
                { icon: "⊘", label: "Session History", action: <span style={{ color: "#555", fontSize: 12 }}>›</span> },
                { icon: "⊛", label: "Privacy Compliance (GDPR/SOC2)", action: <span style={{ color: "#555", fontSize: 12 }}>›</span> },
              ].map((item, i, arr) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 15, color: "#555" }}>{item.icon}</span>
                    <span style={{ fontSize: 12, color: "#ccc" }}>{item.label}</span>
                  </div>
                  {item.action}
                </div>
              ))}
            </div>
          </div>

          {/* Danger zone */}
          <div className="card" style={{ borderColor: "rgba(239,68,68,0.15)" }}>
            <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#ef4444", marginBottom: 3 }}>Archive Environment</div>
                <div style={{ fontSize: 11, color: "#555" }}>
                  Permanently remove this workspace and all associated data. This action is irreversible.
                </div>
              </div>
              <button className="btn btn-danger btn-sm" style={{ flexShrink: 0, marginLeft: 16 }}>Initiate Shutdown</button>
            </div>
          </div>

          {/* Footer */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
            <div style={{ display: "flex", gap: 20, fontSize: 11, color: "#444" }}>
              <a href="#">Documentation</a>
              <a href="#">API Status</a>
              <a href="#">Privacy Policy</a>
            </div>
            <div style={{ fontSize: 10, color: "#333" }}>© 2024 NEXUS SYSTEMS INC. ALL RIGHTS RESERVED.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
