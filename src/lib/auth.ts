import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { compare } from "bcryptjs";
import { prisma } from "./db";
import { ZodError } from "zod";
import { signInSchema } from "./validators"; // We'll create this later

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const { email, password } = credentials;

                // --- MOCK/ADMIN LOGIN (Nexus Flow Easy Mode) ---
                // In development/demo, allow "admin@nexus.flow" / "admin" to bypass password check AND DB check
                if (
                    email === "admin@nexus.flow" &&
                    password === "admin"
                ) {
                    // Return a mock user object directly, bypassing Prisma
                    return {
                        id: "mock-admin-id",
                        name: "Nexus Admin",
                        email: "admin@nexus.flow",
                        image: "https://i.pravatar.cc/150?u=admin",
                        role: "OWNER", // Custom property
                        organizationId: "mock-org-id" // Custom property
                    };
                }

                // Normal Auth Logic
                const user = await prisma.user.findUnique({
                    where: { email: email as string },
                });

                if (!user || !user.password) {
                    return null;
                }

                const isPasswordValid = await compare(password as string, user.password);

                if (isPasswordValid) {
                    return {
                        ...user,
                        organizationId: user.organizationId || undefined,
                        // Ensure other fields match if necessary
                    };
                }

                return null;
            },
        }),
    ],
    callbacks: {
        // Add user.id and role to session
        session: async ({ session, token }) => {
            if (session.user && token.sub) {
                session.user.id = token.sub;

                // MOCK ADMIN BYPASS
                if (session.user.email === "admin@nexus.flow") {
                    // @ts-ignore
                    session.user.role = "OWNER";
                    // @ts-ignore
                    session.user.organizationId = "mock-org-id";
                    return session;
                }

                try {
                    // Fetch org ID
                    const dbUser = await prisma.user.findUnique({
                        where: { id: session.user.id },
                        select: { organizationId: true, role: true }
                    });

                    if (dbUser) {
                        // @ts-ignore: handling prisma null vs next-auth undefined
                        session.user.organizationId = dbUser.organizationId || undefined;
                        // @ts-ignore
                        session.user.role = dbUser.role;
                    }
                } catch (e) {
                    console.warn("DB Session fetch failed, using fallback");
                }
            }
            return session;
        },
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id || "";
                // @ts-ignore
                token.role = user.role;
            }
            return token;
        },
    },
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
});
