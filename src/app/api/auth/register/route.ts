import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { verifyInviteToken } from "@/lib/server/invite-token";
import type { Role } from "@/lib/server/auth-context";

const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    inviteToken: z.string().optional(),
});

function slugifyWorkspaceName(input: string): string {
    const slug = input
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    return slug || "workspace";
}

async function createUniqueOrganization(name: string, email: string) {
    const base = slugifyWorkspaceName(email.split("@")[0] || name);

    for (let attempt = 0; attempt < 5; attempt += 1) {
        const suffix = attempt === 0 ? "" : `-${Math.floor(Math.random() * 100000)}`;
        const slug = `${base}${suffix}`;

        try {
            return await prisma.organization.create({
                data: {
                    name: `${name}'s Workspace`,
                    slug,
                },
            });
        } catch (error: unknown) {
            const prismaError = error as { code?: string };
            if (prismaError?.code !== "P2002") {
                throw error;
            }
        }
    }

    throw new Error("Failed to create unique organization slug");
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, name, inviteToken } = registerSchema.parse(body);
        const normalizedEmail = email.toLowerCase();

        const existingUser = await prisma.user.findUnique({
            where: { email: normalizedEmail },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "User with this email already exists" },
                { status: 409 }
            );
        }

        const hashedPassword = await hash(password, 10);
        let organizationId: string;
        let role: Role = "OWNER";

        if (inviteToken) {
            const invitePayload = verifyInviteToken(inviteToken);
            if (!invitePayload) {
                return NextResponse.json(
                    { message: "Invalid or expired invite token" },
                    { status: 400 }
                );
            }

            if (invitePayload.email !== normalizedEmail) {
                return NextResponse.json(
                    { message: "Invite email does not match signup email" },
                    { status: 400 }
                );
            }

            const organization = await prisma.organization.findUnique({
                where: { id: invitePayload.organizationId },
                select: { id: true },
            });

            if (!organization) {
                return NextResponse.json(
                    { message: "Invite organization no longer exists" },
                    { status: 400 }
                );
            }

            organizationId = organization.id;
            role = invitePayload.role;
        } else {
            // Create organization first, then link user to it
            const organization = await createUniqueOrganization(name, normalizedEmail);
            organizationId = organization.id;
            role = "OWNER";
        }

        const user = await prisma.user.create({
            data: {
                email: normalizedEmail,
                name,
                password: hashedPassword,
                role,
                organizationId,
            },
            select: {
                id: true,
                email: true,
                name: true,
                organizationId: true,
                role: true,
            }
        });

        return NextResponse.json(
            { message: "User created successfully", user },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Invalid input data", errors: error.errors },
                { status: 400 }
            );
        }
        console.error("Registration error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
