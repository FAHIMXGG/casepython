import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, orderId, lineItems, successUrl, cancelUrl } = await req.json();

    if (!userId || !orderId) {
      return new Response("Missing userId or orderId", { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems, // [{ price: 'price_...', quantity: 1 }, ...]
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId,
        orderId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
