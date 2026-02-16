import crypto from "crypto";
import type { Role } from "@/lib/server/auth-context";

type InvitePayload = {
  email: string;
  organizationId: string;
  role: Role;
  invitedById: string;
  exp: number;
};

const INVITE_SECRET = process.env.INVITE_TOKEN_SECRET || process.env.NEXTAUTH_SECRET || "dev-invite-secret";
const TTL_MS = 7 * 24 * 60 * 60 * 1000;

function toBase64Url(input: string): string {
  return Buffer.from(input, "utf8").toString("base64url");
}

function fromBase64Url(input: string): string {
  return Buffer.from(input, "base64url").toString("utf8");
}

function signPayload(encodedPayload: string): string {
  return crypto.createHmac("sha256", INVITE_SECRET).update(encodedPayload).digest("base64url");
}

export function createInviteToken(input: {
  email: string;
  organizationId: string;
  role: Role;
  invitedById: string;
}): string {
  const payload: InvitePayload = {
    email: input.email.toLowerCase(),
    organizationId: input.organizationId,
    role: input.role,
    invitedById: input.invitedById,
    exp: Date.now() + TTL_MS,
  };

  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = signPayload(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function verifyInviteToken(token: string): InvitePayload | null {
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) {
    return null;
  }

  const expected = signPayload(encodedPayload);
  if (signature !== expected) {
    return null;
  }

  try {
    const payload = JSON.parse(fromBase64Url(encodedPayload)) as InvitePayload;
    if (!payload.email || !payload.organizationId || !payload.role || !payload.invitedById || !payload.exp) {
      return null;
    }
    const VALID_ROLES: string[] = ["OWNER", "ADMIN", "MEMBER", "VIEWER"];
    if (!VALID_ROLES.includes(payload.role)) {
      return null;
    }
    if (payload.exp < Date.now()) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

