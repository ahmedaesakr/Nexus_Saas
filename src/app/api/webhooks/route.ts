import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { addWorkflowToQueue } from "@/lib/workflow/engine";
import { canWriteAutomation, getAuthContext } from "@/lib/server/auth-context";
import { currentMonthRange, isLimitReached, PLAN_LIMITS } from "@/lib/billing/limits";

export async function POST(req: Request) {
  try {
    const context = await getAuthContext();
    if (!context) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!canWriteAutomation(context.role)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { workflowId, input } = await req.json();

    if (!workflowId) {
      return NextResponse.json({ message: "Workflow ID is required" }, { status: 400 });
    }

    // Verify workflow exists and belongs to user's organization
    const workflow = await prisma.workflow.findFirst({
      where: {
        id: workflowId,
        organizationId: context.organizationId,
      },
      select: {
        id: true,
        status: true,
      },
    });

    if (!workflow) {
      return NextResponse.json({ message: "Workflow not found" }, { status: 404 });
    }

    if (workflow.status !== "ACTIVE") {
      return NextResponse.json(
        { message: "Workflow is not active. Only ACTIVE workflows can be triggered." },
        { status: 400 }
      );
    }

    const organization = await prisma.organization.findUnique({
      where: { id: context.organizationId },
      select: { plan: true },
    });

    if (!organization) {
      return NextResponse.json({ message: "Organization not found" }, { status: 404 });
    }

    const { start, end } = currentMonthRange();
    const monthlyExecutions = await prisma.execution.count({
      where: {
        workflow: {
          organizationId: context.organizationId,
        },
        createdAt: {
          gte: start,
          lt: end,
        },
      },
    });

    const executionLimit = PLAN_LIMITS[organization.plan].monthlyExecutions;
    if (isLimitReached(monthlyExecutions, executionLimit)) {
      return NextResponse.json(
        { message: "Monthly execution limit reached for your current plan. Upgrade to continue." },
        { status: 403 }
      );
    }

    // Create execution record
    const execution = await prisma.execution.create({
      data: {
        workflowId,
        triggeredById: context.userId,
        status: "PENDING",
        input: input || {},
      },
    });

    // Add to BullMQ queue for async execution
    await addWorkflowToQueue(execution.id, workflowId, input || {});

    return NextResponse.json({
      message: "Workflow triggered successfully",
      executionId: execution.id,
    });
  } catch (error) {
    console.error("Error triggering workflow:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// Generate a webhook URL for a workflow
export async function PUT(req: Request) {
  try {
    const context = await getAuthContext();
    if (!context) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!canWriteAutomation(context.role)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { workflowId } = await req.json();

    if (!workflowId) {
      return NextResponse.json({ message: "Workflow ID is required" }, { status: 400 });
    }

    const workflow = await prisma.workflow.findFirst({
      where: {
        id: workflowId,
        organizationId: context.organizationId,
      },
    });

    if (!workflow) {
      return NextResponse.json({ message: "Workflow not found" }, { status: 404 });
    }

    // Generate webhook secret
    const webhookSecret = uuidv4();

    // In a real implementation, you'd store this in the database
    // For now, we'll just return a generated URL
    const webhookUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhooks/trigger/${workflowId}`;

    return NextResponse.json({
      webhookUrl,
      webhookSecret,
    });
  } catch (error) {
    console.error("Error generating webhook:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
