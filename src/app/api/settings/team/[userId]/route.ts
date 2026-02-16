import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { canManageTeam, getAuthContext } from "@/lib/server/auth-context";

const updateRoleSchema = z.object({
  role: z.enum(["ADMIN", "MEMBER", "VIEWER"]),
});

function canModifyTarget(actorRole: Role, targetRole: Role): boolean {
  if (actorRole === Role.OWNER) {
    return true;
  }
  if (actorRole === Role.ADMIN) {
    return targetRole !== Role.OWNER && targetRole !== Role.ADMIN;
  }
  return false;
}

function canAssignRole(actorRole: Role, nextRole: Role): boolean {
  if (actorRole === Role.OWNER) {
    return nextRole !== Role.OWNER;
  }
  if (actorRole === Role.ADMIN) {
    return nextRole === Role.MEMBER || nextRole === Role.VIEWER;
  }
  return false;
}

export async function PATCH(
  _req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const context = await getAuthContext();
    if (!context) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!canManageTeam(context.role)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { userId } = await params;
    const body = await req.json();
    const { role } = updateRoleSchema.parse(body);

    if (userId === context.userId) {
      return NextResponse.json({ message: "You cannot change your own role" }, { status: 400 });
    }

    const target = await prisma.user.findFirst({
      where: {
        id: userId,
        organizationId: context.organizationId,
      },
      select: {
        id: true,
        role: true,
      },
    });

    if (!target) {
      return NextResponse.json({ message: "Member not found" }, { status: 404 });
    }
    if (!canModifyTarget(context.role, target.role)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
    if (!canAssignRole(context.role, role as Role)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const updated = await prisma.user.update({
      where: { id: target.id },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid input", errors: error.errors }, { status: 400 });
    }
    console.error("Error updating team member role:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const context = await getAuthContext();
    if (!context) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!canManageTeam(context.role)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { userId } = await params;

    if (userId === context.userId) {
      return NextResponse.json({ message: "You cannot remove yourself" }, { status: 400 });
    }

    const target = await prisma.user.findFirst({
      where: {
        id: userId,
        organizationId: context.organizationId,
      },
      select: {
        id: true,
        role: true,
      },
    });

    if (!target) {
      return NextResponse.json({ message: "Member not found" }, { status: 404 });
    }
    if (!canModifyTarget(context.role, target.role)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await prisma.user.update({
      where: { id: target.id },
      data: {
        organizationId: null,
        role: Role.MEMBER,
      },
    });

    return NextResponse.json({ message: "Member removed" });
  } catch (error) {
    console.error("Error removing team member:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
