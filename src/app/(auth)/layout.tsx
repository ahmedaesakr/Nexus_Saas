import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-container">
      {/* Left panel */}
      <div className="auth-left">
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 48, textDecoration: "none", color: "inherit" }}>
          <div style={{ width: 24, height: 24, background: "#4ade80", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="1" y="1" width="4" height="4" fill="#000" />
              <rect x="7" y="1" width="4" height="4" fill="#000" />
              <rect x="1" y="7" width="4" height="4" fill="#000" />
              <rect x="7" y="7" width="4" height="4" fill="#000" opacity="0.5" />
            </svg>
          </div>
          <span style={{ fontSize: 14, fontWeight: 700 }}>Nexus</span>
        </Link>

        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 16 }}>
            Command every workflow
            <br />
            <span style={{ color: "#4ade80" }}>from one control plane.</span>
          </h1>
          <p style={{ fontSize: 13, color: "#555", lineHeight: 1.6, maxWidth: 340 }}>
            Nexus gives your team operator-grade infrastructure for projects, deployments, and automation — all in one operational OS.
          </p>
        </div>

        {/* Testimonial */}
        <div style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: "16px 20px" }}>
          <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
            {"★★★★★".split("").map((s, i) => (
              <span key={i} style={{ color: "#4ade80", fontSize: 13 }}>{s}</span>
            ))}
          </div>
          <p style={{ fontSize: 13, color: "#888", lineHeight: 1.5, margin: "0 0 12px" }}>
            &quot;Nexus gave us an operator-grade workflow layer. The product feels premium, but the real win is how quickly our automations became reliable.&quot;
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#4ade80", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#000" }}>AC</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#d0d0d0" }}>Alex Chen</div>
              <div style={{ fontSize: 11, color: "#555" }}>Head of Automation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="auth-terminal">
        <div style={{ width: "100%", maxWidth: 380, padding: "0 40px" }} className="animate-fade-in-up">
          {children}
        </div>
      </div>
    </div>
  );
}
