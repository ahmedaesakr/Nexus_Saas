type KanbanCard = {
  id: string;
  title: string;
  desc: string;
  tag: string;
  tagColor: string;
  priority: number;
  time?: string;
  done?: boolean;
  avatars?: string[];
  progress?: number;
  comments?: number;
  hasImage?: boolean;
};

const COLS: Array<{
  id: string;
  label: string;
  count: number;
  color: string;
  cards: KanbanCard[];
}> = [
  {
    id: "todo",
    label: "TO DO",
    count: 4,
    color: "#555",
    cards: [
      {
        id: "c1",
        title: "API Infrastructure Audit",
        desc: "Complete the deep scan of legacy endpoints and identify security bottlenecks.",
        tag: "HIGH PRIORITY",
        tagColor: "red",
        time: "01:24",
        done: false,
        priority: 2,
      },
      {
        id: "c2",
        title: "Sync Everboarding Flow",
        desc: "",
        tag: "DOCUMENTATION",
        tagColor: "gray",
        avatars: ["AC", "BL"],
        time: "1 day",
        done: false,
        priority: 0,
      },
    ],
  },
  {
    id: "in_progress",
    label: "IN PROGRESS",
    count: 3,
    color: "#3b82f6",
    cards: [
      {
        id: "c3",
        title: "Neural Core Calibration",
        desc: "",
        tag: "LIVE DEPLOYMENT",
        tagColor: "green",
        progress: 65,
        comments: 4,
        priority: 3,
      },
    ],
  },
  {
    id: "review",
    label: "REVIEW",
    count: 2,
    color: "#a855f7",
    cards: [
      {
        id: "c4",
        title: "Client Auth Refactor",
        desc: "",
        tag: "WRITING IN SYNC",
        tagColor: "green",
        hasImage: true,
        priority: 1,
      },
      {
        id: "c5",
        title: "Global Style Tokens",
        desc: "2 extra completed",
        tag: "",
        tagColor: "gray",
        priority: 0,
      },
    ],
  },
];

const TAG_COLORS: Record<string, string> = {
  red: "badge-red",
  green: "badge-green",
  blue: "badge-blue",
  gray: "badge-gray",
  yellow: "badge-yellow",
};

export default function WorkspacePage() {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 10, color: "#555", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
          OPERATIONS / ALPHA-1
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
          <div>
            <h1 className="page-title" style={{ marginBottom: 4 }}>Neural Pipeline V2</h1>
            <p style={{ fontSize: 12, color: "#555", margin: 0, maxWidth: 440 }}>
              System-wide architectural overhaul for distributed data ingestion. Synchronize all nodes by Q4-End.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex" }}>
              {["AC", "BL", "KR"].map((a) => (
                <div
                  key={a}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: "#222",
                    border: "2px solid #0a0a0a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 9,
                    fontWeight: 700,
                    color: "#888",
                    marginLeft: -6,
                  }}
                >
                  {a[0]}
                </div>
              ))}
            </div>
            <button className="btn btn-secondary btn-sm">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              Filter
            </button>
            <button className="btn btn-secondary btn-sm">
              ↗ Share Board
            </button>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 16 }}>
        {COLS.map((col) => (
          <div className="kanban-col" key={col.id} style={{ width: 280, minWidth: 280, display: "flex", flexDirection: "column" }}>
            {/* Col header */}
            <div className="kanban-col-header">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: col.color, display: "inline-block", flexShrink: 0 }} />
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: "#888" }}>{col.label}</span>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    background: "rgba(255,255,255,0.06)",
                    padding: "1px 6px",
                    borderRadius: 99,
                    color: "#555",
                  }}
                >
                  {col.count}
                </span>
              </div>
              <button style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 16 }}>+</button>
            </div>

            {/* Cards */}
            <div style={{ padding: 8, display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
              {col.cards.map((card) => (
                <div className="kanban-card" key={card.id}>
                  {card.tag && (
                    <span className={`badge ${TAG_COLORS[card.tagColor]}`} style={{ marginBottom: 8, display: "inline-flex" }}>
                      {card.tagColor === "red" && "● "}
                      {card.tagColor === "green" && "● "}
                      {card.tag}
                    </span>
                  )}
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#f0f0f0", marginBottom: card.desc ? 6 : 0 }}>
                    {card.title}
                  </div>
                  {card.desc && (
                    <div style={{ fontSize: 11, color: "#555", marginBottom: 8, lineHeight: 1.4 }}>{card.desc}</div>
                  )}
                  {card.hasImage && (
                    <div
                      style={{
                        height: 60,
                        background: "rgba(255,255,255,0.03)",
                        borderRadius: 4,
                        marginBottom: 8,
                        border: "1px solid rgba(255,255,255,0.05)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                        color: "#444",
                      }}
                    >
                      Preview
                    </div>
                  )}
                  {card.progress !== undefined && (
                    <div style={{ marginBottom: 8 }}>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${card.progress}%` }} />
                      </div>
                    </div>
                  )}
                  {/* Footer */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {card.time && (
                      <span style={{ fontSize: 10, color: "#555" }}>
                        🕐 {card.time}
                      </span>
                    )}
                    {card.comments !== undefined && (
                      <span style={{ fontSize: 10, color: "#555" }}>
                        💬 {card.comments}
                      </span>
                    )}
                    {card.priority > 0 && (
                      <span className="ml-auto" style={{ fontSize: 10, color: "#555" }}>
                        {"!".repeat(card.priority)}
                      </span>
                    )}
                    {card.avatars && (
                      <div style={{ marginLeft: "auto", display: "flex" }}>
                        {card.avatars.map((a) => (
                          <div
                            key={a}
                            style={{
                              width: 18,
                              height: 18,
                              borderRadius: "50%",
                              background: "#222",
                              border: "1px solid #0a0a0a",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 8,
                              fontWeight: 700,
                              color: "#888",
                              marginLeft: -4,
                            }}
                          >
                            {a[0]}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <button
                style={{
                  background: "none",
                  border: "1px dashed rgba(255,255,255,0.1)",
                  borderRadius: 6,
                  padding: "8px",
                  color: "#444",
                  cursor: "pointer",
                  fontSize: 11,
                  width: "100%",
                  transition: "border-color 150ms, color 150ms",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(74,222,128,0.3)";
                  e.currentTarget.style.color = "#4ade80";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.color = "#444";
                }}
              >
                + Add card
              </button>
            </div>
          </div>
        ))}

        {/* Add column */}
        <div
          style={{
            minWidth: 200,
            display: "flex",
            alignItems: "flex-start",
            paddingTop: 10,
          }}
        >
          <button
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              padding: "20px 24px",
              background: "rgba(255,255,255,0.02)",
              border: "1px dashed rgba(255,255,255,0.08)",
              borderRadius: 8,
              color: "#444",
              cursor: "pointer",
              fontSize: 11,
              width: "100%",
            }}
          >
            <span style={{ fontSize: 20 }}>+</span>
            Add column
          </button>
        </div>
      </div>
    </div>
  );
}
