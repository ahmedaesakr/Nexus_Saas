const STEPS = [
  {
    id: 1,
    title: "Environment Setup",
    desc: "Configure your workspace and connect your primary data source.",
    status: "complete",
    duration: "~2 min",
  },
  {
    id: 2,
    title: "Invite Your Team",
    desc: "Add team members and assign roles to begin collaboration.",
    status: "complete",
    duration: "~3 min",
  },
  {
    id: 3,
    title: "Create First Project",
    desc: "Spin up your first project using a template or from scratch.",
    status: "active",
    duration: "~5 min",
  },
  {
    id: 4,
    title: "Connect Integrations",
    desc: "Link GitHub, Slack, or other tools to streamline your workflow.",
    status: "pending",
    duration: "~4 min",
  },
  {
    id: 5,
    title: "Run First Deployment",
    desc: "Deploy your pipeline and verify end-to-end connectivity.",
    status: "pending",
    duration: "~6 min",
  },
];

const RESOURCES = [
  { icon: "📘", title: "Documentation Hub", desc: "Complete API references, guides, and walkthroughs.", href: "#" },
  { icon: "🎬", title: "Video Tutorials", desc: "Step-by-step screencasts for all major features.", href: "#" },
  { icon: "💬", title: "Community Forum", desc: "Connect with engineers using Nexus worldwide.", href: "#" },
  { icon: "⚡", title: "Quick Start Templates", desc: "Pre-built pipelines to clone and deploy instantly.", href: "#" },
];

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  complete: { bg: "rgba(74,222,128,0.1)", color: "#4ade80", label: "✓" },
  active: { bg: "rgba(59,130,246,0.12)", color: "#3b82f6", label: "→" },
  pending: { bg: "rgba(255,255,255,0.04)", color: "#444", label: "○" },
};

export default function OnboardingPage() {
  const completed = STEPS.filter((s) => s.status === "complete").length;
  const progress = Math.round((completed / STEPS.length) * 100);

  return (
    <div style={{ maxWidth: 860 }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div className="section-eyebrow">EVERBOARDING HUB</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 className="page-title">Getting Started</h1>
          <span style={{ fontSize: 12, color: "#4ade80", fontWeight: 600 }}>
            {completed}/{STEPS.length} Complete
          </span>
        </div>
        <div className="progress-bar" style={{ marginTop: 12, height: 4 }}>
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 24 }}>
        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {STEPS.map((step) => {
            const style = STATUS_STYLES[step.status];
            return (
              <div
                className="card"
                key={step.id}
                style={{
                  padding: 16,
                  display: "flex",
                  gap: 14,
                  borderColor: step.status === "active" ? "rgba(59,130,246,0.2)" : undefined,
                  cursor: "pointer",
                  transition: "border-color 150ms",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: style.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    fontWeight: 700,
                    color: style.color,
                    flexShrink: 0,
                  }}
                >
                  {style.label}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: step.status === "pending" ? "#555" : "#f0f0f0" }}>
                      {step.title}
                    </span>
                    <span style={{ fontSize: 10, color: "#444" }}>{step.duration}</span>
                  </div>
                  <p style={{ fontSize: 12, color: "#666", margin: 0 }}>{step.desc}</p>
                  {step.status === "active" && (
                    <button className="btn btn-primary btn-sm" style={{ marginTop: 10 }}>
                      Continue →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Resources */}
        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-header">
              <span className="card-title">Your Profile</span>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "#4ade80",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#000",
                  }}
                >
                  AC
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>Alex Chen</div>
                  <div style={{ fontSize: 11, color: "#555" }}>System Administrator</div>
                </div>
              </div>
              <button className="btn btn-secondary btn-sm" style={{ width: "100%", justifyContent: "center" }}>
                Edit Profile
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <span className="card-title">Resources</span>
            </div>
            <div style={{ padding: "4px 0" }}>
              {RESOURCES.map((r, i) => (
                <a
                  key={r.title}
                  href={r.href}
                  style={{
                    display: "flex",
                    gap: 10,
                    padding: "10px 16px",
                    borderBottom: i < RESOURCES.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    cursor: "pointer",
                    transition: "background 150ms",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <span style={{ fontSize: 16 }}>{r.icon}</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#ccc", marginBottom: 2 }}>{r.title}</div>
                    <div style={{ fontSize: 11, color: "#555" }}>{r.desc}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
