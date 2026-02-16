import { PrismaClient, Role, Plan, WorkflowStatus, ExecutionStatus } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clean existing data
  await prisma.executionLog.deleteMany();
  await prisma.execution.deleteMany();
  await prisma.workflow.deleteMany();
  await prisma.agent.deleteMany();
  await prisma.integration.deleteMany();
  await prisma.user.deleteMany();
  await prisma.organization.deleteMany();

  // Create organization
  const org = await prisma.organization.create({
    data: {
      name: "Nexus Demo",
      slug: "nexus-demo",
      plan: Plan.PRO,
    },
  });

  // Create users
  const password = await hash("password123", 10);

  const owner = await prisma.user.create({
    data: {
      name: "Alex Chen",
      email: "alex@nexusflow.app",
      password,
      role: Role.OWNER,
      organizationId: org.id,
    },
  });

  const admin = await prisma.user.create({
    data: {
      name: "Sarah Miller",
      email: "sarah@nexusflow.app",
      password,
      role: Role.ADMIN,
      organizationId: org.id,
    },
  });

  await prisma.user.create({
    data: {
      name: "Jordan Lee",
      email: "jordan@nexusflow.app",
      password,
      role: Role.MEMBER,
      organizationId: org.id,
    },
  });

  // Create workflows
  const salesWorkflow = await prisma.workflow.create({
    data: {
      name: "Sales Outreach",
      description: "Automatically send follow-up emails to leads who haven't responded in 3 days.",
      icon: "mail",
      status: WorkflowStatus.ACTIVE,
      definition: {
        nodes: [
          { id: "trigger-1", type: "trigger", position: { x: 250, y: 5 }, data: { label: "New Lead (Webhook)", type: "webhook" } },
          { id: "agent-1", type: "ai-agent", position: { x: 250, y: 150 }, data: { label: "Lead Qualifier", model: "claude-3-5-sonnet" } },
          { id: "action-1", type: "action", position: { x: 250, y: 300 }, data: { label: "Send Email", action: "send_email" } },
        ],
        edges: [
          { id: "e1-2", source: "trigger-1", target: "agent-1", animated: true },
          { id: "e2-3", source: "agent-1", target: "action-1", animated: true },
        ],
      },
      organizationId: org.id,
      createdById: owner.id,
    },
  });

  const supportWorkflow = await prisma.workflow.create({
    data: {
      name: "Support Ticket Triage",
      description: "Categorize incoming support tickets using AI and assign to the right agent.",
      icon: "support_agent",
      status: WorkflowStatus.ACTIVE,
      definition: {
        nodes: [
          { id: "trigger-1", type: "trigger", position: { x: 250, y: 5 }, data: { label: "New Ticket", type: "webhook" } },
          { id: "agent-1", type: "ai-agent", position: { x: 250, y: 150 }, data: { label: "Ticket Classifier" } },
          { id: "condition-1", type: "condition", position: { x: 250, y: 300 }, data: { label: "Priority Check", condition: "priority > 3" } },
        ],
        edges: [
          { id: "e1-2", source: "trigger-1", target: "agent-1", animated: true },
          { id: "e2-3", source: "agent-1", target: "condition-1", animated: true },
        ],
      },
      organizationId: org.id,
      createdById: admin.id,
    },
  });

  const leadWorkflow = await prisma.workflow.create({
    data: {
      name: "Lead Qualification",
      description: "Score new leads based on company size and industry data enrichment.",
      icon: "campaign",
      status: WorkflowStatus.DRAFT,
      definition: {
        nodes: [
          { id: "trigger-1", type: "trigger", position: { x: 250, y: 5 }, data: { label: "Form Submission", type: "webhook" } },
          { id: "action-1", type: "action", position: { x: 250, y: 150 }, data: { label: "Enrich Data" } },
        ],
        edges: [
          { id: "e1-2", source: "trigger-1", target: "action-1", animated: true },
        ],
      },
      organizationId: org.id,
      createdById: owner.id,
    },
  });

  const dataSyncWorkflow = await prisma.workflow.create({
    data: {
      name: "Data Sync",
      description: "Sync customer records between CRM and marketing platform every hour.",
      icon: "sync",
      status: WorkflowStatus.ACTIVE,
      definition: { nodes: [], edges: [] },
      organizationId: org.id,
      createdById: admin.id,
    },
  });

  // Create agents
  await prisma.agent.createMany({
    data: [
      {
        name: "Support Specialist",
        description: "Handles Tier 1 support tickets, classifies issues, and drafts responses.",
        model: "claude-3-5-sonnet",
        temperature: 0.3,
        systemPrompt: "You are a customer support specialist. Classify tickets by urgency and draft helpful responses.",
        tools: JSON.parse('["ticket_classify", "draft_response", "escalate"]'),
        organizationId: org.id,
      },
      {
        name: "Outreach Copilot",
        description: "Personalizes cold emails and manages follow-up sequences.",
        model: "claude-3-5-sonnet",
        temperature: 0.7,
        systemPrompt: "You are a sales outreach specialist. Write personalized emails based on prospect data.",
        tools: JSON.parse('["email_send", "crm_lookup", "calendar_check"]'),
        organizationId: org.id,
      },
      {
        name: "Recruiter AI",
        description: "Screens resumes and schedules initial interviews.",
        model: "claude-3-5-sonnet",
        temperature: 0.5,
        systemPrompt: "You are a recruiting assistant. Screen candidate resumes and schedule interviews.",
        tools: JSON.parse('["resume_parse", "calendar_schedule", "email_send"]'),
        organizationId: org.id,
      },
      {
        name: "Data Analyst",
        description: "Analyzes business metrics and generates reports.",
        model: "claude-3-5-sonnet",
        temperature: 0.2,
        systemPrompt: "You are a data analyst. Analyze metrics and generate clear reports.",
        tools: JSON.parse('["query_database", "generate_chart", "export_report"]'),
        organizationId: org.id,
      },
    ],
  });

  // Create executions with logs
  const now = new Date();
  const workflows = [salesWorkflow, supportWorkflow, leadWorkflow, dataSyncWorkflow];

  for (let i = 0; i < 20; i++) {
    const wf = workflows[i % workflows.length];
    const minutesAgo = i * 15 + Math.floor(Math.random() * 10);
    const createdAt = new Date(now.getTime() - minutesAgo * 60 * 1000);
    const durationMs = Math.floor(Math.random() * 120000) + 5000;

    const status: ExecutionStatus =
      i === 1 ? "RUNNING" :
      i === 4 ? "FAILED" :
      i === 7 ? "PENDING" :
      "COMPLETED";

    const execution = await prisma.execution.create({
      data: {
        workflowId: wf.id,
        triggeredById: i % 2 === 0 ? owner.id : admin.id,
        status,
        input: { source: "webhook", data: { leadId: `lead_${i}` } },
        output: status === "COMPLETED" ? { result: "success", processed: true } : undefined,
        startedAt: status !== "PENDING" ? createdAt : undefined,
        completedAt: status === "COMPLETED" || status === "FAILED"
          ? new Date(createdAt.getTime() + durationMs)
          : undefined,
        createdAt,
      },
    });

    // Add execution logs
    if (status !== "PENDING") {
      await prisma.executionLog.create({
        data: {
          executionId: execution.id,
          nodeId: "trigger-1",
          nodeName: "Trigger",
          status: "COMPLETED",
          message: "Webhook received",
          timestamp: createdAt,
        },
      });

      if (status === "COMPLETED") {
        await prisma.executionLog.create({
          data: {
            executionId: execution.id,
            nodeId: "agent-1",
            nodeName: "AI Agent",
            status: "COMPLETED",
            message: "Agent processed successfully",
            timestamp: new Date(createdAt.getTime() + durationMs / 2),
          },
        });
      }

      if (status === "FAILED") {
        await prisma.executionLog.create({
          data: {
            executionId: execution.id,
            nodeId: "agent-1",
            nodeName: "AI Agent",
            status: "FAILED",
            message: "API Timeout (Salesforce)",
            timestamp: new Date(createdAt.getTime() + durationMs),
          },
        });
      }
    }
  }

  // Create integrations
  await prisma.integration.createMany({
    data: [
      { provider: "slack", name: "Slack", config: { workspace: "nexus-demo" }, organizationId: org.id },
      { provider: "github", name: "GitHub", config: { org: "nexus-demo" }, organizationId: org.id },
    ],
  });

  console.log("Seed complete!");
  console.log(`  Organization: ${org.name} (${org.id})`);
  console.log(`  Users: 3 (owner: alex@nexusflow.app, password: password123)`);
  console.log(`  Workflows: 4`);
  console.log(`  Agents: 4`);
  console.log(`  Executions: 20`);
  console.log(`  Integrations: 2`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
