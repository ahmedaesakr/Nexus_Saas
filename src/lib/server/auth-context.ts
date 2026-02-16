import { Role } from "@prisma/client";
import { auth } from "@/lib/auth";

export type AuthContext = {
  userId: string;
  organizationId: string;
  role: Role;
  email?: string | null;
};

const ROLE_SET = new Set<string>(["OWNER", "ADMIN", "MEMBER", "VIEWER"]);

function parseRole(role?: string): Role {
  if (!role || !ROLE_SET.has(role)) {
    return Role.MEMBER;
  }
  return role as Role;
}

export async function getAuthContext(): Promise<AuthContext | null> {
  const session = await auth();
  const userId = session?.user?.id;
  const organizationId = session?.user?.organizationId;

  if (!userId || !organizationId) {
    return null;
  }

  return {
    userId,
    organizationId,
    role: parseRole(session.user.role),
    email: session.user.email,
  };
}

export function canManageBilling(role: Role): boolean {
  return role === Role.OWNER || role === Role.ADMIN;
}

export function canWriteAutomation(role: Role): boolean {
  return role === Role.OWNER || role === Role.ADMIN || role === Role.MEMBER;
}

export function canDeleteAutomation(role: Role): boolean {
  return role === Role.OWNER || role === Role.ADMIN;
}

export function canManageTeam(role: Role): boolean {
  return role === Role.OWNER || role === Role.ADMIN;
}

export function canManageOrganizationSettings(role: Role): boolean {
  return role === Role.OWNER || role === Role.ADMIN;
}

export function canAssignTeamRole(actorRole: Role, nextRole: Role): boolean {
  if (actorRole === Role.OWNER) {
    return nextRole === Role.ADMIN || nextRole === Role.MEMBER || nextRole === Role.VIEWER;
  }
  if (actorRole === Role.ADMIN) {
    return nextRole === Role.MEMBER || nextRole === Role.VIEWER;
  }
  return false;
}
