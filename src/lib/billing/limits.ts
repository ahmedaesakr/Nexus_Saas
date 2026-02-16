export type PlanLimits = {
  workflows: number | null;
  agents: number | null;
  monthlyExecutions: number | null;
};

export const PLAN_LIMITS: Record<string, PlanLimits> = {
  FREE: {
    workflows: 3,
    agents: 2,
    monthlyExecutions: 100,
  },
  STARTER: {
    workflows: 25,
    agents: 10,
    monthlyExecutions: 2000,
  },
  PRO: {
    workflows: null,
    agents: null,
    monthlyExecutions: 20000,
  },
  ENTERPRISE: {
    workflows: null,
    agents: null,
    monthlyExecutions: null,
  },
};

export function isLimitReached(currentCount: number, max: number | null): boolean {
  if (max === null) {
    return false;
  }
  return currentCount >= max;
}

export function currentMonthRange(date = new Date()): { start: Date; end: Date } {
  const start = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 1, 0, 0, 0, 0);
  return { start, end };
}

