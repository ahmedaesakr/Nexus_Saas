import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { canDeleteAutomation, canWriteAutomation, getAuthContext } from "@/lib/server/auth-context";

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  avatar: z.string().optional(),
  systemPrompt: z.string().min(1).optional(),
  model: z.string().optional(),
  temperature: z.number().min(0).max(2).optional(),
  tools: z.array(z.any()).optional(),
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

    const agent = await prisma.agent.findFirst({
      where: {
        id,
        organizationId: context.organizationId,
      },
    });

    if (!agent) {
      return NextResponse.json({ message: "Agent not found" }, { status: 404 });
    }

    return NextResponse.json(agent);
  } catch (error) {
    console.error("Error fetching agent:", error);
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

    const existing = await prisma.agent.findFirst({
      where: {
        id,
        organizationId: context.organizationId,
      },
    });

    if (!existing) {
      return NextResponse.json({ message: "Agent not found" }, { status: 404 });
    }

    const agent = await prisma.agent.update({
      where: { id },
      data,
    });

    return NextResponse.json(agent);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid input", errors: error.errors }, { status: 400 });
    }
    console.error("Error updating agent:", error);
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

    const existing = await prisma.agent.findFirst({
      where: {
        id,
        organizationId: context.organizationId,
      },
    });

    if (!existing) {
      return NextResponse.json({ message: "Agent not found" }, { status: 404 });
    }

    await prisma.agent.delete({ where: { id } });

    return NextResponse.json({ message: "Agent deleted" });
  } catch (error) {
    console.error("Error deleting agent:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
