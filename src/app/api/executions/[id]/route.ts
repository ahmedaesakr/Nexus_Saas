import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAuthContext } from "@/lib/server/auth-context";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const context = await getAuthContext();
    if (!context) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const execution = await prisma.execution.findFirst({
      where: {
        id,
        workflow: {
          organizationId: context.organizationId,
        },
      },
      include: {
        workflow: true,
        triggeredBy: {
          select: { id: true, name: true, email: true },
        },
        logs: {
          orderBy: { timestamp: "asc" },
        },
      },
    });

    if (!execution) {
      return NextResponse.json({ message: "Execution not found" }, { status: 404 });
    }

    return NextResponse.json(execution);
  } catch (error) {
    console.error("Error fetching execution:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
