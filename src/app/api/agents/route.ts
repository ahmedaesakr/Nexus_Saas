import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { canWriteAutomation, getAuthContext } from "@/lib/server/auth-context";
import { PLAN_LIMITS, isLimitReached } from "@/lib/billing/limits";

const agentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  avatar: z.string().optional(),
  systemPrompt: z.string().min(1, "System prompt is required"),
  model: z.string().default("claude-3-sonnet"),
  temperature: z.number().min(0).max(2).default(0.7),
  tools: z.array(z.any()).default([]),
});

export async function GET(req: Request) {
  try {
    const context = await getAuthContext();
    if (!context) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const agents = await prisma.agent.findMany({
      where: {
        organizationId: context.organizationId,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(agents);
  } catch (error) {
    console.error("Error fetching agents:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const context = await getAuthContext();
    if (!context) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!canWriteAutomation(context.role)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const data = agentSchema.parse(body);

    const organization = await prisma.organization.findUnique({
      where: { id: context.organizationId },
      select: {
        plan: true,
        _count: {
          select: { agents: true },
        },
      },
    });

    if (!organization) {
      return NextResponse.json({ message: "Organization not found" }, { status: 404 });
    }

    const agentLimit = PLAN_LIMITS[organization.plan].agents;
    if (isLimitReached(organization._count.agents, agentLimit)) {
      return NextResponse.json(
        { message: "Agent limit reached for your current plan. Upgrade to create more agents." },
        { status: 403 }
      );
    }

    const agent = await prisma.agent.create({
      data: {
        ...data,
        organizationId: context.organizationId,
      },
    });

    return NextResponse.json(agent, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid input", errors: error.errors }, { status: 400 });
    }
    console.error("Error creating agent:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
