import { Template } from "@/types/workflow";
import { Node, Edge } from "@xyflow/react";

// Helper to create nodes
const createTrigger = (id: string, label: string, y: number = 50) => ({
    id, type: 'trigger', position: { x: 250, y }, data: { label, type: 'webhook' }
});

const createAction = (id: string, label: string, y: number) => ({
    id, type: 'action', position: { x: 250, y }, data: { label, service: 'http-request' }
});

const createAgent = (id: string, label: string, y: number) => ({
    id, type: 'ai-agent', position: { x: 250, y }, data: { label, model: 'claude-3-5-sonnet' }
});

export const TEMPLATES: Template[] = [
    // SALES CATEGORY
    {
        id: "sales-lead-qual",
        title: "Lead Qualification Agent",
        description: "Automatically score incoming leads using AI and route high-value prospects to your CRM.",
        category: "sales",
        estimatedTime: "5 min",
        requiredIntegrations: ["salesforce", "slack"],
        nodes: [
            createTrigger("t1", "New Lead Form"),
            createAgent("a1", "Qualify Lead", 150),
            createAction("ac1", "Update Salesforce", 300),
            createAction("ac2", "Notify Sales Team", 400)
        ],
        edges: [
            { id: "e1", source: "t1", target: "a1" },
            { id: "e2", source: "a1", target: "ac1" },
            { id: "e3", source: "ac1", target: "ac2" }
        ]
    },
    {
        id: "sales-followup",
        title: "Automated Follow-Up Sequence",
        description: "Send a sequence of personalized emails to leads who haven't responded in 3 days.",
        category: "sales",
        estimatedTime: "10 min",
        requiredIntegrations: ["gmail"],
        nodes: [
            createTrigger("t1", "Deal Stage Changed"),
            { id: "d1", type: "delay", position: { x: 250, y: 150 }, data: { label: "Wait 3 Days", duration: "3d" } },
            createAgent("a1", "Draft Follow-up", 250),
            createAction("ac1", "Send Email", 350)
        ],
        edges: [
            { id: "e1", source: "t1", target: "d1" },
            { id: "e2", source: "d1", target: "a1" },
            { id: "e3", source: "a1", target: "ac1" }
        ]
    },
    {
        id: "sales-meeting",
        title: "Inbound Meeting Scheduler",
        description: "Parse incoming email inquiries and automatically propose meeting times.",
        category: "sales",
        estimatedTime: "8 min",
        requiredIntegrations: ["gmail", "google-calendar"],
        nodes: [
            createTrigger("t1", "New Email Inquiry"),
            createAgent("a1", "Extract Intent", 150),
            createAction("ac1", "Check Calendar", 250),
            createAgent("a2", "Draft Reply", 350),
            createAction("ac2", "Send Reply", 450)
        ],
        edges: [
            { id: "e1", source: "t1", target: "a1" },
            { id: "e2", source: "a1", target: "ac1" },
            { id: "e3", source: "ac1", target: "a2" },
            { id: "e4", source: "a2", target: "ac2" }
        ]
    },

    // MARKETING CATEGORY
    {
        id: "mkt-social-listen",
        title: "Social Media Listener",
        description: "Monitor brand mentions on Twitter and LinkedIn, and analyze sentiment.",
        category: "marketing",
        estimatedTime: "5 min",
        requiredIntegrations: ["slack"],
        nodes: [
            createTrigger("t1", "New Mention"),
            createAgent("a1", "Analyze Sentiment", 150),
            { id: "c1", type: "condition", position: { x: 250, y: 250 }, data: { label: "Is Negative?" } },
            createAction("ac1", "Alert Support", 400)
        ],
        edges: [
            { id: "e1", source: "t1", target: "a1" },
            { id: "e2", source: "a1", target: "c1" },
            { id: "e3", source: "c1", target: "ac1", sourceHandle: "true" }
        ]
    },
    {
        id: "mkt-content-repurpose",
        title: "Content Repurposer",
        description: "Turn a single blog post into a thread of tweets and a LinkedIn post.",
        category: "marketing",
        estimatedTime: "3 min",
        requiredIntegrations: [],
        nodes: [
            createTrigger("t1", "New Blog Post"),
            createAgent("a1", "Generate Tweets", 150),
            createAgent("a2", "Generate LinkedIn", 250),
            createAction("ac1", "Save Drafts", 400)
        ],
        edges: [
            { id: "e1", source: "t1", target: "a1" },
            { id: "e2", source: "t1", target: "a2" },
            { id: "e3", source: "a1", target: "ac1" },
            { id: "e4", source: "a2", target: "ac1" }
        ]
    },

    // SUPPORT CATEGORY
    {
        id: "sup-ticket-triage",
        title: "Support Ticket Triage",
        description: "Categorize incoming tickets and assign priority based on keywords.",
        category: "support",
        estimatedTime: "5 min",
        requiredIntegrations: ["zendesk", "slack"],
        nodes: [
            createTrigger("t1", "New Ticket"),
            createAgent("a1", "Classify Issue", 150),
            createAction("ac1", "Update Tags", 250),
            createAction("ac2", "Assign Agent", 350)
        ],
        edges: [
            { id: "e1", source: "t1", target: "a1" },
            { id: "e2", source: "a1", target: "ac1" },
            { id: "e3", source: "ac1", target: "ac2" }
        ]
    },
    {
        id: "sup-faq-bot",
        title: "FAQ Auto-Responder",
        description: "Automatically answer common questions using your knowledge base.",
        category: "support",
        estimatedTime: "10 min",
        requiredIntegrations: ["gmail"],
        nodes: [
            createTrigger("t1", "New Support Email"),
            createAgent("a1", "Check Knowledge Base", 150),
            { id: "c1", type: "condition", position: { x: 250, y: 250 }, data: { label: "Answer Found?" } },
            createAction("ac1", "Send Answer", 400)
        ],
        edges: [
            { id: "e1", source: "t1", target: "a1" },
            { id: "e2", source: "a1", target: "c1" },
            { id: "e3", source: "c1", target: "ac1", sourceHandle: "true" }
        ]
    },

    // OTHERS
    {
        id: "ops-daily-report",
        title: "Daily Standup Report",
        description: "Collect updates from Slack and compile a summary report.",
        category: "operations",
        estimatedTime: "5 min",
        requiredIntegrations: ["slack"],
        nodes: [
            { id: "t1", type: "trigger", position: { x: 250, y: 50 }, data: { label: "Every Morning", type: "schedule" } },
            createAction("ac1", "Fetch Updates", 150),
            createAgent("a1", "Summarize", 250),
            createAction("ac2", "Post Summary", 350)
        ],
        edges: [
            { id: "e1", source: "t1", target: "ac1" },
            { id: "e2", source: "ac1", target: "a1" },
            { id: "e3", source: "a1", target: "ac2" }
        ]
    }
];
