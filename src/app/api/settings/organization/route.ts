import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { canManageOrganizationSettings, getAuthContext } from "@/lib/server/auth-context";

const updateOrganizationSchema = z.object({
  name: z.string().trim().min(2).max(80).optional(),
  logo: z.string().trim().url().or(z.literal("")).optional(),
});

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
        name: true,
        slug: true,
        logo: true,
        plan: true,
      },
    });

    if (!organization) {
      return NextResponse.json({ message: "Organization not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...organization,
      role: context.role,
    });
  } catch (error) {
    console.error("Error fetching organization settings:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const context = await getAuthContext();
    if (!context) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!canManageOrganizationSettings(context.role)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const parsed = updateOrganizationSchema.parse(body);

    const data: { name?: string; logo?: string | null } = {};
    if (typeof parsed.name === "string") {
      data.name = parsed.name;
    }
    if (typeof parsed.logo === "string") {
      data.logo = parsed.logo || null;
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ message: "No changes submitted" }, { status: 400 });
    }

    const organization = await prisma.organization.update({
      where: { id: context.organizationId },
      data,
      select: {
        id: true,
        name: true,
        slug: true,
        logo: true,
        plan: true,
      },
    });

    return NextResponse.json(organization);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid input", errors: error.errors }, { status: 400 });
    }
    console.error("Error updating organization settings:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

