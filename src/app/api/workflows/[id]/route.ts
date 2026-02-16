import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { canDeleteAutomation, canWriteAutomation, getAuthContext } from "@/lib/server/auth-context";

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
  definition: z.any().optional(),
  status: z.enum(["DRAFT", "ACTIVE", "PAUSED", "ARCHIVED"]).optional(),
  isTemplate: z.boolean().optional(),
});

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const context = await getAuthContext();
    if (!context) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!canWriteAutomation(context.role)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;

    const workflow = await prisma.workflow.findFirst({
      where: {
        id,
        organizationId: context.organizationId,
      },
      include: {
        createdBy: {
          select: { id: true, name: true, email: true, image: true },
        },
        _count: {
          select: { executions: true },
        },
      },
    });

    if (!workflow) {
      return NextResponse.json({ message: "Workflow not found" }, { status: 404 });
    }

    return NextResponse.json(workflow);
  } catch (error) {
    console.error("Error fetching workflow:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const context = await getAuthContext();
    if (!context) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!canDeleteAutomation(context.role)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();
    const data = updateSchema.parse(body);

    // Verify ownership
    const existing = await prisma.workflow.findFirst({
      where: {
        id,
        organizationId: context.organizationId,
      },
    });

    if (!existing) {
      return NextResponse.json({ message: "Workflow not found" }, { status: 404 });
    }

    const workflow = await prisma.workflow.update({
      where: { id },
      data,
    });

    return NextResponse.json(workflow);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid input", errors: error.errors }, { status: 400 });
    }
    console.error("Error updating workflow:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const context = await getAuthContext();
    if (!context) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Verify ownership
    const existing = await prisma.workflow.findFirst({
      where: {
        id,
        organizationId: context.organizationId,
      },
    });

    if (!existing) {
      return NextResponse.json({ message: "Workflow not found" }, { status: 404 });
    }

    await prisma.workflow.delete({ where: { id } });

    return NextResponse.json({ message: "Workflow deleted" });
  } catch (error) {
    console.error("Error deleting workflow:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
