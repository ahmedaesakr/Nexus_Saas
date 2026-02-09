import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
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
                // In development/demo, allow "admin@nexus.flow" / "admin" to bypass password check or simplify it
                if (
                    email === "admin@nexus.flow" &&
                    password === "admin"
                ) {
                    // Check if admin user exists in DB
                    let user = await prisma.user.findUnique({
                        where: { email: email as string },
                    });

                    // Create admin if not exists (Auto-Seeding)
                    if (!user) {
                        user = await prisma.user.create({
                            data: {
                                email: email as string,
                                name: "Nexus Admin",
                                role: "OWNER",
                                organization: {
                                    create: {
                                        name: "Nexus Corp",
                                        slug: "nexus-corp",
                                        plan: "ENTERPRISE",
                                    },
                                },
                            },
                        });
                    }

                    return user;
                }

                // Normal Auth Logic (Replace with bcrypt.compare later)
                const user = await prisma.user.findUnique({
                    where: { email: email as string },
                });

                if (!user || !user.password) {
                    return null;
                }

                // For now, simple string comparison (Use bcrypt in production!)
                if (password === user.password) {
                    return user;
                }

                return null;
            },
        }),
    ],
    callbacks: {
        // Add user.id and role to session
        session: async ({ session, user, token }) => {
            if (session.user) {
                if (token.sub) {
                    session.user.id = token.sub;
                }

                // Fetch role from DB if using JWT strategy (adapter + credentials often means JWT)
                // Since we use PrismaAdapter with Credentials, session strategy defaults to "jwt" usually
                // Let's ensure role is passed
                if (token.role) {
                    // @ts-ignore
                    session.user.role = token.role;
                }

                // Fetch org ID
                const dbUser = await prisma.user.findUnique({
                    where: { id: session.user.id },
                    select: { organizationId: true, role: true }
                });

                if (dbUser) {
                    // @ts-ignore
                    session.user.organizationId = dbUser.organizationId;
                    // @ts-ignore
                    session.user.role = dbUser.role;
                }
            }
            return session;
        },
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
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
