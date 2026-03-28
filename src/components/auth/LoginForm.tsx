"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });
    if (result?.error) {
      setError("Invalid credentials. Try admin@nexus.flow / admin");
      setIsLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    const result = await signIn("credentials", {
      email: "admin@nexus.flow",
      password: "admin",
      redirect: false,
    });
    if (!result?.error) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setIsLoading(false);
      setError("Demo login failed.");
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 4 }}>Access Mission Control</h2>
        <p style={{ fontSize: 12, color: "#555" }}>Sign in to your Nexus workspace</p>
      </div>

      {/* Demo access shortcut */}
      <button
        onClick={handleDemoLogin}
        disabled={isLoading}
        style={{
          width: "100%",
          padding: "10px 16px",
          background: "rgba(74,222,128,0.07)",
          border: "1px solid rgba(74,222,128,0.2)",
          borderRadius: 6,
          color: "#4ade80",
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
          marginBottom: 20,
          transition: "background 150ms",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(74,222,128,0.12)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(74,222,128,0.07)")}
      >
        <span style={{ fontSize: 14 }}>⚡</span>
        Enter with Demo Account
      </button>

      {/* Divider */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
        <span style={{ fontSize: 10, color: "#444", textTransform: "uppercase", letterSpacing: "0.08em" }}>or sign in manually</span>
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {error && (
          <div style={{ padding: "10px 12px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 6, fontSize: 12, color: "#ef4444" }}>
            {error}
          </div>
        )}

        <div>
          <label className="form-label">Email address</label>
          <input name="email" type="email" className="form-input" placeholder="name@company.com" required />
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
            <label className="form-label" style={{ margin: 0 }}>Password</label>
            <a href="#" style={{ fontSize: 11, color: "#4ade80" }}>Forgot password?</a>
          </div>
          <input name="password" type="password" className="form-input" placeholder="••••••••" required />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary"
          style={{ width: "100%", justifyContent: "center", padding: "10px", marginTop: 4, opacity: isLoading ? 0.6 : 1 }}
        >
          {isLoading ? "Authenticating..." : "Sign In →"}
        </button>
      </form>

      <p style={{ marginTop: 20, fontSize: 12, color: "#444", textAlign: "center" }}>
        No account?{" "}
        <Link href="/signup" style={{ color: "#4ade80" }}>Create workspace</Link>
      </p>

      <div style={{ marginTop: 20, padding: "10px 12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 6 }}>
        <div style={{ fontSize: 10, color: "#444", fontFamily: "monospace" }}>Demo credentials:</div>
        <div style={{ fontSize: 11, color: "#555", fontFamily: "monospace", marginTop: 3 }}>
          admin@nexus.flow / admin
        </div>
      </div>
    </div>
  );
}
