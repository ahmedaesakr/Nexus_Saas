import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAuthContext } from "@/lib/server/auth-context";

export async function GET(req: Request) {
  try {
    const context = await getAuthContext();
    if (!context) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const workflowId = searchParams.get("workflowId");
    const status = searchParams.get("status");

    const where: any = {
      workflow: {
        organizationId: context.organizationId,
      },
    };

    if (workflowId) where.workflowId = workflowId;
    if (status) where.status = status;

    const executions = await prisma.execution.findMany({
      where,
      include: {
        workflow: {
          select: { id: true, name: true },
        },
        triggeredBy: {
          select: { id: true, name: true, email: true },
        },
        _count: {
          select: { logs: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    return NextResponse.json(executions);
  } catch (error) {
    console.error("Error fetching executions:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
