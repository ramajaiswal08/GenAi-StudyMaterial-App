import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const returnUrl = process.env.HOST_URL || "http://localhost:3000";

    const { customerId } = await req.json();
    console.log("Customer ID received in API:", customerId);

    if (!customerId) {
      return NextResponse.json(
        { error: "Missing customerId" },
        { status: 400 }
      );
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    // ✅ Return only the URL for frontend redirect
    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error("Stripe Portal Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
