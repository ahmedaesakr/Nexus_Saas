import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/db";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-04-10",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = (await headers()).get("stripe-signature") || "";

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const organizationId = session.metadata?.organizationId;
        const plan = session.metadata?.plan;

        if (organizationId && plan) {
          await prisma.organization.update({
            where: { id: organizationId },
            data: {
              plan: plan as any,
              stripeCustomerId: session.customer as string,
            },
          });
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const organization = await prisma.organization.findFirst({
          where: { stripeCustomerId: customerId },
        });

        if (organization) {
          let plan: string = "FREE";
          
          if (subscription.status === "active") {
            const priceId = subscription.items.data[0]?.price.id;
            if (priceId === process.env.STRIPE_ENTERPRISE_PRICE_ID) {
              plan = "ENTERPRISE";
            } else if (priceId === process.env.STRIPE_PRO_PRICE_ID) {
              plan = "PRO";
            } else if (priceId === process.env.STRIPE_STARTER_PRICE_ID) {
              plan = "STARTER";
            }
          }

          await prisma.organization.update({
            where: { id: organization.id },
            data: { plan: plan as any },
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const organization = await prisma.organization.findFirst({
          where: { stripeCustomerId: customerId },
        });

        if (organization) {
          await prisma.organization.update({
            where: { id: organization.id },
            data: { plan: "FREE" },
          });
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ message: "Webhook error" }, { status: 500 });
  }
}
