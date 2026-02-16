import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import Stripe from "stripe";
import { canManageBilling, getAuthContext } from "@/lib/server/auth-context";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-04-10",
});

export async function POST(req: Request) {
  try {
    const context = await getAuthContext();
    if (!context) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!canManageBilling(context.role)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const organization = await prisma.organization.findUnique({
      where: { id: context.organizationId },
    });

    if (!organization?.stripeCustomerId) {
      return NextResponse.json(
        { message: "No active subscription" },
        { status: 400 }
      );
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: organization.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/settings`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error("Error creating portal session:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
