import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#f0f0f0", fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Nav */}
      <nav className="landing-nav">
        <div className="landing-nav-logo">
          <div
            style={{
              width: 24,
              height: 24,
              background: "#4ade80",
              borderRadius: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="1" y="1" width="4" height="4" fill="#000" />
              <rect x="7" y="1" width="4" height="4" fill="#000" />
              <rect x="1" y="7" width="4" height="4" fill="#000" />
              <rect x="7" y="7" width="4" height="4" fill="#000" opacity="0.5" />
            </svg>
          </div>
          Nexus
        </div>
        <div className="landing-nav-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#docs">Docs</a>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <Link href="/login" className="btn btn-ghost btn-sm">Sign In</Link>
          <Link href="/signup" className="btn btn-primary btn-sm">Get Started →</Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="landing-hero" style={{ paddingTop: 140 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "4px 12px",
            background: "rgba(74,222,128,0.08)",
            border: "1px solid rgba(74,222,128,0.2)",
            borderRadius: 99,
            fontSize: 11,
            color: "#4ade80",
            fontWeight: 600,
            marginBottom: 24,
            letterSpacing: "0.04em",
          }}
        >
          <span className="animate-pulse-green" style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} />
          SYSTEMS ONLINE — V2.4 LIVE
        </div>

        <h1
          style={{
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            maxWidth: 800,
            margin: "0 auto 24px",
          }}
        >
          Command Every Operation
          <br />
          <span style={{ color: "#4ade80" }}>From One Control Plane.</span>
        </h1>

        <p
          style={{
            fontSize: "clamp(14px, 2vw, 18px)",
            color: "#666",
            maxWidth: 520,
            lineHeight: 1.6,
            margin: "0 auto 40px",
          }}
        >
          Nexus is a dark-mode operational OS for modern teams. Manage projects, monitor infrastructure, and orchestrate deployments across every dimension.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/login" className="btn btn-primary" style={{ padding: "10px 24px", fontSize: 14 }}>
            Access Mission Control →
          </Link>
          <a href="#features" className="btn btn-secondary" style={{ padding: "10px 24px", fontSize: 14 }}>
            See Features
          </a>
        </div>

        {/* Dashboard preview */}
        <div
          style={{
            marginTop: 60,
            width: "100%",
            maxWidth: 900,
            background: "#111",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
          }}
        >
          {/* Fake browser bar */}
          <div
            style={{
              height: 36,
              background: "#0d0d0d",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "0 14px",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444", opacity: 0.6 }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#eab308", opacity: 0.6 }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#4ade80", opacity: 0.6 }} />
            <div
              style={{
                margin: "0 auto",
                background: "#1a1a1a",
                borderRadius: 4,
                padding: "3px 14px",
                fontSize: 10,
                color: "#444",
                width: 200,
                textAlign: "center",
              }}
            >
              app.nexus.io/dashboard
            </div>
          </div>

          {/* Dashboard mockup */}
          <div style={{ display: "flex", height: 320 }}>
            {/* Sidebar */}
            <div style={{ width: 140, background: "#0d0d0d", borderRight: "1px solid rgba(255,255,255,0.05)", padding: "12px 0" }}>
              <div style={{ padding: "0 10px 10px", borderBottom: "1px solid rgba(255,255,255,0.05)", marginBottom: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#f0f0f0" }}>Nexus</div>
                <div style={{ fontSize: 8, color: "#333", textTransform: "uppercase", letterSpacing: "0.08em" }}>Silent Authority</div>
              </div>
              {["Mission Control", "Project Workspace", "Data Command", "Everboarding Hub", "System Settings"].map((item, i) => (
                <div
                  key={item}
                  style={{
                    padding: "5px 10px",
                    fontSize: 10,
                    color: i === 0 ? "#4ade80" : "#444",
                    background: i === 0 ? "rgba(74,222,128,0.08)" : "transparent",
                    margin: "1px 4px",
                    borderRadius: 4,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
            {/* Content */}
            <div style={{ flex: 1, padding: "16px 20px", background: "#0a0a0a" }}>
              <div style={{ fontSize: 9, color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>SYSTEMS ONLINE</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Mission Control</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 120px", gap: 12 }}>
                <div style={{ background: "#111", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 6, padding: 12 }}>
                  <div style={{ fontSize: 8, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Active Projects</div>
                  {["Project Helios", "Aethelgard Network", "Obsidian Protocol"].map((p, i) => (
                    <div key={p} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: ["#4ade80", "#eab308", "#ef4444"][i] }} />
                      <div style={{ flex: 1, height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 99 }}>
                        <div style={{ height: "100%", width: ["78%", "44%", "22%"][i], background: ["#4ade80", "#eab308", "#ef4444"][i], borderRadius: 99 }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ background: "#111", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 6, padding: 12, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: "#4ade80" }}>92%</div>
                  <div style={{ fontSize: 8, color: "#555", textTransform: "uppercase", textAlign: "center" }}>CPU Load</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div id="features" style={{ padding: "80px 32px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "#4ade80", textTransform: "uppercase", marginBottom: 8 }}>CAPABILITIES</div>
          <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.03em" }}>Everything your team needs to operate.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { icon: "⊞", title: "Mission Control", desc: "Real-time system health, AI-driven insights, and live project tracking." },
            { icon: "⊟", title: "Project Workspace", desc: "Kanban boards with priority tagging, team avatars, and progress tracking." },
            { icon: "⊠", title: "Data Command", desc: "Tabular view of all tasks with filtering, sorting, and bulk actions." },
            { icon: "⊡", title: "Everboarding Hub", desc: "Structured onboarding and learning resources for every team member." },
            { icon: "⚙", title: "System Settings", desc: "Security protocols, integrations, and notification preferences." },
            { icon: "⚡", title: "AI Insights", desc: "Neural recommendations to optimize pipelines and increase throughput." },
          ].map((f) => (
            <div
              key={f.title}
              style={{
                background: "#111",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 8,
                padding: 20,
              }}
            >
              <div style={{ fontSize: 20, marginBottom: 12, color: "#4ade80" }}>{f.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: 12, color: "#555", lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: "60px 32px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 12 }}>
          Ready to take command?
        </h2>
        <p style={{ color: "#555", marginBottom: 24, fontSize: 13 }}>
          Sign in with the demo account or create a new workspace.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <Link href="/login" className="btn btn-primary" style={{ padding: "10px 24px", fontSize: 14 }}>
            Enter Mission Control
          </Link>
          <Link href="/signup" className="btn btn-secondary" style={{ padding: "10px 24px", fontSize: 14 }}>
            Create Account
          </Link>
        </div>
        <div style={{ marginTop: 16, fontSize: 11, color: "#333" }}>
          Demo: <span style={{ color: "#555" }}>admin@nexus.flow</span> / <span style={{ color: "#555" }}>admin</span>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: "24px 32px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", fontSize: 11, color: "#333" }}>
        <span>© 2024 Nexus Systems Inc.</span>
        <div style={{ display: "flex", gap: 16 }}>
          <a href="#">Docs</a>
          <a href="#">API Status</a>
          <a href="#">Privacy</a>
        </div>
      </div>
    </div>
  );
}
