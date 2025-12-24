"use server";
// 2259
import { BASE_PRICE, PRODUCT_PRICE } from "@/config/products";
import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import { Order } from "@prisma/client";

export const createCheckoutSession = async ({
  configId,
  couponCode,
}: {
  configId: string;
  couponCode?: string;
}) => {
  const configuration = await db.configuration.findUnique({
    where: { id: configId },
  });

  if (!configuration) {
    throw new Error("Configuration not found");
  }

  const user = await currentUser();
  console.log("Clerk user:", user);

  if (!user) {
    throw new Error("User not authenticated");
  }

  // ✅ Ensure user exists in DB
  let existingDbUser = await db.user.findUnique({
    where: { id: user.id },
  });

  if (!existingDbUser) {
    console.log("User not found in DB. Creating new user...");

    existingDbUser = await db.user.create({
      data: {
        id: user.id, // Clerk user ID
        email: user.emailAddresses[0]?.emailAddress || "",
      },
    });
  }

  const { material, finish } = configuration;
  let price = BASE_PRICE;
  if (finish === "textured") price += PRODUCT_PRICE.finish.textured;
  if (material === "polycarbonate")
    price += PRODUCT_PRICE.material.polycarbonate;

  // Apply coupon discount if provided
  let discountAmount = 0;
  let appliedCoupon = null;
  if (couponCode) {
    const coupon = await db.coupon.findUnique({
      where: { code: couponCode.toUpperCase().trim() },
    });

    if (coupon && coupon.isActive) {
      // Validate coupon
      const now = new Date();
      const isValid =
        (!coupon.validUntil || new Date(coupon.validUntil) >= now) &&
        (!coupon.validFrom || new Date(coupon.validFrom) <= now) &&
        (!coupon.maxUses || coupon.usedCount < coupon.maxUses) &&
        (!coupon.minAmount || price / 100 >= coupon.minAmount);

      if (isValid) {
        appliedCoupon = coupon;
        discountAmount = (price * coupon.discount) / 100;
        price = Math.max(0, price - discountAmount); // Ensure price doesn't go negative
        // Round to nearest integer (Stripe requires integer cents)
        price = Math.round(price);
      }
    }
  }

  // Ensure price is an integer for Stripe
  price = Math.round(price);

  let order: Order | undefined;

  const existingOrder = await db.order.findFirst({
    where: {
      userId: user.id,
      configurationId: configuration.id,
    },
  });

  console.log("User ID:", user.id);
  console.log("Config ID:", configuration.id);

  if (existingOrder) {
    order = existingOrder;
    // Update order with new price and coupon info
    await db.order.update({
      where: { id: order.id },
      data: {
        amount: price / 100,
      },
    });
  } else {
    order = await db.order.create({
      data: {
        amount: price / 100,
        userId: user.id,
        configurationId: configuration.id,
      },
    });
  }

  // Increment coupon usage if applied
  if (appliedCoupon) {
    await db.coupon.update({
      where: { id: appliedCoupon.id },
      data: {
        usedCount: {
          increment: 1,
        },
      },
    });
  }

  const product = await stripe.products.create({
    name: "Customized Product",
    description: "A customized product based on your configuration",
    images: [configuration.imageUrl],
    default_price_data: {
      currency: "USD",
      unit_amount: price,
    },
  });

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
    payment_method_types: ["card", "cashapp", "amazon_pay", "us_bank_account"],
    mode: "payment",
    shipping_address_collection: { allowed_countries: ["US", "BD"] },
    metadata: {
      userId: user.id,
      orderId: order.id,
    },
    line_items: [
      {
        price: product.default_price as string,
        quantity: 1,
      },
    ],
  });

  return { url: stripeSession.url };
};
