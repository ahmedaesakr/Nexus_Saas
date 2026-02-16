import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { PLAN_LIMITS, currentMonthRange } from "@/lib/billing/limits";
import { getAuthContext } from "@/lib/server/auth-context";

function toUsage(current: number, max: number | null) {
  return {
    current,
    limit: max,
    remaining: max === null ? null : Math.max(max - current, 0),
  };
}

export async function GET() {
  try {
    const context = await getAuthContext();
    if (!context) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const organization = await prisma.organization.findUnique({
      where: { id: context.organizationId },
      select: {
        id: true,
        plan: true,
        _count: {
          select: {
            workflows: true,
            agents: true,
          },
        },
      },
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

    const limits = PLAN_LIMITS[organization.plan];

    return NextResponse.json({
      organizationId: organization.id,
      plan: organization.plan,
      usage: {
        workflows: toUsage(organization._count.workflows, limits.workflows),
        agents: toUsage(organization._count.agents, limits.agents),
        monthlyExecutions: toUsage(monthlyExecutions, limits.monthlyExecutions),
      },
      period: {
        start: start.toISOString(),
        end: end.toISOString(),
      },
    });
  } catch (error) {
    console.error("Error fetching billing usage:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

