const ROWS = [
  { id: "TKT-001", name: "Deploy Auth Gateway v2.1", owner: "Alex Chen", priority: "Critical", status: "In Progress", updated: "2h ago", tags: ["backend", "security"] },
  { id: "TKT-002", name: "Neural Core Calibration", owner: "Zara Ahmed", priority: "High", status: "Blocked", updated: "4h ago", tags: ["ml", "ops"] },
  { id: "TKT-003", name: "Frontend Token Sync", owner: "Billy Lo", priority: "Medium", status: "Complete", updated: "1d ago", tags: ["ui", "design"] },
  { id: "TKT-004", name: "API Rate Limiter Fix", owner: "Chris Park", priority: "High", status: "In Progress", updated: "30m ago", tags: ["backend"] },
  { id: "TKT-005", name: "Database Index Optimization", owner: "Dana Wu", priority: "Low", status: "Backlog", updated: "3d ago", tags: ["db"] },
  { id: "TKT-006", name: "Webhook Delivery Refactor", owner: "Elena Ford", priority: "Medium", status: "Review", updated: "6h ago", tags: ["backend", "infra"] },
  { id: "TKT-007", name: "Mobile Push Notification Flow", owner: "Femi Johnson", priority: "High", status: "In Progress", updated: "1h ago", tags: ["mobile"] },
  { id: "TKT-008", name: "Audit Log Formatter", owner: "Grace Lee", priority: "Low", status: "Complete", updated: "2d ago", tags: ["ops"] },
];

const STATUS_BADGE: Record<string, string> = {
  "In Progress": "badge-blue",
  "Blocked": "badge-red",
  "Complete": "badge-green",
  "Backlog": "badge-gray",
  "Review": "badge-yellow",
};

const PRIORITY_COLOR: Record<string, string> = {
  "Critical": "#ef4444",
  "High": "#f97316",
  "Medium": "#eab308",
  "Low": "#888",
};

export default function DataCommandPage() {
  return (
    <div style={{ maxWidth: 1080 }}>
      {/* Header */}
      <div style={{ marginBottom: 20, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <div className="section-eyebrow">DATA COMMAND</div>
          <h1 className="page-title">Task Registry</h1>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-secondary btn-sm">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filter
          </button>
          <button className="btn btn-secondary btn-sm">
            ↓ Export
          </button>
          <button className="btn btn-primary btn-sm">+ New Task</button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid-stats" style={{ marginBottom: 20 }}>
        {[
          { label: "Total", value: "142", change: "+8 this week" },
          { label: "In Progress", value: "23", change: "" },
          { label: "Blocked", value: "4", change: "", color: "#ef4444" },
          { label: "Completed", value: "89", change: "" },
        ].map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={{ fontSize: 22, color: s.color }}>{s.value}</div>
            {s.change && <div className="stat-change positive">{s.change}</div>}
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">All Tasks</span>
          <div style={{ display: "flex", gap: 6 }}>
            <input
              placeholder="Filter tasks..."
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 4,
                padding: "3px 10px",
                fontSize: 11,
                color: "#888",
                outline: "none",
              }}
            />
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Owner</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Tags</th>
                <th>Updated</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.id}>
                  <td style={{ fontFamily: "monospace", fontSize: 10, color: "#444" }}>{row.id}</td>
                  <td style={{ fontWeight: 500, color: "#d0d0d0" }}>{row.name}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: "#222",
                          border: "1px solid #333",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 8,
                          fontWeight: 700,
                          color: "#777",
                          flexShrink: 0,
                        }}
                      >
                        {row.owner[0]}
                      </div>
                      {row.owner}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: 11, fontWeight: 600, color: PRIORITY_COLOR[row.priority] }}>
                      {row.priority}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${STATUS_BADGE[row.status]}`} style={{ fontSize: 9 }}>
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                      {row.tags.map((t) => (
                        <span className="chip" key={t}>{t}</span>
                      ))}
                    </div>
                  </td>
                  <td style={{ fontSize: 10, color: "#444" }}>{row.updated}</td>
                  <td>
                    <button className="btn btn-ghost btn-xs">···</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
