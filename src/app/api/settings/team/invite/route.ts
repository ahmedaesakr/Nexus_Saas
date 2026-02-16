import { NextResponse } from "next/server";
import { z } from "zod";
import { canAssignTeamRole, canManageTeam, getAuthContext, type Role } from "@/lib/server/auth-context";
import { createInviteToken } from "@/lib/server/invite-token";
import { sendTeamInviteEmail } from "@/lib/email";

const inviteSchema = z.object({
  email: z.string().email("Invalid email address"),
  role: z.enum(["ADMIN", "MEMBER", "VIEWER"]).default("MEMBER"),
});

export async function POST(req: Request) {
  try {
    const context = await getAuthContext();
    if (!context) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!canManageTeam(context.role)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { email, role } = inviteSchema.parse(body);

    if (!canAssignTeamRole(context.role, role as Role)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const token = createInviteToken({
      email,
      organizationId: context.organizationId,
      role: role as Role,
      invitedById: context.userId,
    });

    const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000").replace(/\/$/, "");
    const inviteUrl = `${baseUrl}/signup?invite=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`;

    await sendTeamInviteEmail(email, inviteUrl);

    return NextResponse.json({
      message: "Invite sent",
      inviteUrl,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid input", errors: error.errors }, { status: 400 });
    }
    console.error("Error sending team invite:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

