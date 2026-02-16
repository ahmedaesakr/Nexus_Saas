import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { canManageTeam, getAuthContext } from "@/lib/server/auth-context";

export async function GET() {
  try {
    const context = await getAuthContext();
    if (!context) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const members = await prisma.user.findMany({
      where: { organizationId: context.organizationId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        createdAt: true,
      },
      orderBy: [
        { role: "asc" },
        { createdAt: "asc" },
      ],
    });

    return NextResponse.json({
      canManage: canManageTeam(context.role),
      currentUserId: context.userId,
      currentUserRole: context.role,
      members,
    });
  } catch (error) {
    console.error("Error fetching team members:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

