import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { canWriteAutomation, getAuthContext } from "@/lib/server/auth-context";
import { PLAN_LIMITS, isLimitReached } from "@/lib/billing/limits";

const workflowSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  icon: z.string().optional(),
  definition: z.any().default({ nodes: [], edges: [] }),
  status: z.enum(["DRAFT", "ACTIVE", "PAUSED", "ARCHIVED"]).optional().default("DRAFT"),
  isTemplate: z.boolean().optional().default(false),
});

export async function GET(req: Request) {
  try {
    const context = await getAuthContext();
    if (!context) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const isTemplate = searchParams.get("isTemplate");

    const where: any = {
      organizationId: context.organizationId,
    };

    if (status) where.status = status;
    if (isTemplate === "true") where.isTemplate = true;

    const workflows = await prisma.workflow.findMany({
      where,
      include: {
        createdBy: {
          select: { id: true, name: true, email: true },
        },
        _count: {
          select: { executions: true },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    const parsedWorkflows = workflows.map((w) => ({
      ...w,
      definition: typeof w.definition === "string" ? JSON.parse(w.definition) : w.definition,
    }));

    return NextResponse.json(parsedWorkflows);
  } catch (error) {
    console.error("Error fetching workflows:", error);
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
    const data = workflowSchema.parse(body);

    const organization = await prisma.organization.findUnique({
      where: { id: context.organizationId },
      select: {
        plan: true,
        _count: {
          select: { workflows: true },
        },
      },
    });

    if (!organization) {
      return NextResponse.json({ message: "Organization not found" }, { status: 404 });
    }

    const workflowLimit = PLAN_LIMITS[organization.plan].workflows;
    if (isLimitReached(organization._count.workflows, workflowLimit)) {
      return NextResponse.json(
        { message: "Workflow limit reached for your current plan. Upgrade to create more workflows." },
        { status: 403 }
      );
    }

    const workflow = await prisma.workflow.create({
      data: {
        name: data.name,
        description: data.description,
        icon: data.icon,
        definition: JSON.stringify(data.definition),
        status: data.status,
        isTemplate: data.isTemplate,
        organizationId: context.organizationId,
        createdById: context.userId,
      },
    });

    return NextResponse.json(workflow, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid input", errors: error.errors }, { status: 400 });
    }
    console.error("Error creating workflow:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
