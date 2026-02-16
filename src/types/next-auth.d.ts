import { DefaultSession, User as NextAuthUser } from "next-auth";
import { JWT as NextAuthJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            role?: string;
            organizationId?: string;
        } & DefaultSession["user"];
    }

    interface User extends NextAuthUser {
        role?: string;
        organizationId?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends NextAuthJWT {
        id: string;
        role?: string;
        organizationId?: string;
    }
}
