import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import Stripe from "stripe";
import { canManageBilling, getAuthContext } from "@/lib/server/auth-context";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-04-10",
});

const PRICE_IDS: Record<string, string> = {
  STARTER: process.env.STRIPE_STARTER_PRICE_ID || "",
  PRO: process.env.STRIPE_PRO_PRICE_ID || "",
  ENTERPRISE: process.env.STRIPE_ENTERPRISE_PRICE_ID || "",
};

export async function POST(req: Request) {
  try {
    const context = await getAuthContext();
    if (!context) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!canManageBilling(context.role)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { plan } = await req.json();

    if (!plan || !PRICE_IDS[plan]) {
      return NextResponse.json({ message: "Invalid plan" }, { status: 400 });
    }

    const organization = await prisma.organization.findUnique({
      where: { id: context.organizationId },
    });

    if (!organization) {
      return NextResponse.json({ message: "Organization not found" }, { status: 404 });
    }

    let customerId = organization.stripeCustomerId;

    // Create Stripe customer if doesn't exist
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: context.email || undefined,
        metadata: {
          organizationId: organization.id,
        },
      });
      customerId = customer.id;

      await prisma.organization.update({
        where: { id: organization.id },
        data: { stripeCustomerId: customerId },
      });
    }

    // Create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: PRICE_IDS[plan],
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/settings?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/settings`,
      metadata: {
        organizationId: organization.id,
        plan,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
