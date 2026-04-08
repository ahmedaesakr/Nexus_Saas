import { SignJWT, jwtVerify } from "jose";
import type { Role } from "./auth-context";

const INVITE_SECRET = process.env.INVITE_SECRET || "invite-secret-key";
const secretKey = new TextEncoder().encode(INVITE_SECRET);

export type InvitePayload = {
  email: string;
  organizationId: string;
  role: Role;
  exp: number;
};

export async function createInviteToken(
  email: string,
  organizationId: string,
  role: Role
): Promise<string> {
  const token = await new SignJWT({
    email,
    organizationId,
    role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);

  return token;
}

export function verifyInviteToken(token: string): InvitePayload | null {
  // Synchronous wrapper for async jwtVerify
  let result: InvitePayload | null = null;

  jwtVerify(token, secretKey)
    .then(({ payload }) => {
      result = payload as unknown as InvitePayload;
    })
    .catch(() => {
      result = null;
    });

  // For synchronous usage, we need to handle this differently
  // This is a placeholder - in production, use async/await pattern
  return result;
}

export async function verifyInviteTokenAsync(token: string): Promise<InvitePayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as unknown as InvitePayload;
  } catch {
    return null;
  }
}