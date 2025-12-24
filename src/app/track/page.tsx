import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import React from "react";
import { OrderStatus } from "@prisma/client";
import Image from "next/image";
import { cn, formatPrice } from "@/lib/utils";
import { COLORS } from "@/validators/option-validator";
import {Package, PackageOpen, Truck,} from "lucide-react";
import PhoneD from "@/components/PhoneD";

const LABEL_MAP: Record<OrderStatus, string> = {
  awaiting_shipment: "Awaiting Shipment",
  fulfilled: "Fulfilled",
  shipped: "Shipped",
};

const Page = async ({
  searchParams,
}: {
  searchParams: { orderId: string };
}) => {
  const user = await currentUser();
  const orderId = searchParams.orderId;

  if (!user?.id || !orderId) {
    return notFound();
  }

  const order = await db.order.findFirst({
    where: {
      id: orderId,
      userId: user.id,
      isPaid: true,
    },
    include: {
      shippingAddress: true,
      configuration: {
        select: {
          croppedImageUrl: true,
          model: true,
          color: true,
        },
      },
    },
  });

  if (!order) {
    return notFound();
  }

  const tw = COLORS.find(
    (supportedColor) => supportedColor.value === order?.configuration?.color
  )?.tw;

  return (
    <div className="min-h-screen bg-muted/40 py-10">
      <div className="max-w-3xl mx-auto bg-card rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6 text-foreground">Order Tracking</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order Details */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-foreground">Order Details</h2>
            <div className="space-y-2">
              <p className="transition-colors duration-300">
                <span className="font-medium text-foreground">Order ID:</span> <span className="text-muted-foreground">{order.id}</span>
              </p>
              <p className="font-bold transition-colors duration-300">
                <span className="font-medium text-foreground">Status:</span>{" "}
                <span className="text-foreground">{LABEL_MAP[order.status]}</span>
              </p>
              <p className="transition-colors duration-300">
                <span className="font-medium text-foreground">Order Date:</span>{" "}
                <span className="text-muted-foreground">{order.createdAt.toLocaleDateString()}</span>
              </p>
              <p className="transition-colors duration-300">
                <span className="font-medium text-foreground">Amount:</span>{" "}
                <span className="text-muted-foreground">{formatPrice(order.amount)}</span>
              </p>
              <p className="transition-colors duration-300">
                <span className="font-medium text-foreground">Model:</span>{" "}
                <span className="text-muted-foreground">{order.configuration.model}</span>
              </p>
              <p className="transition-colors duration-300">
                <span className="font-medium text-foreground">Color:</span>{" "}
                <span className="text-muted-foreground">{order.configuration.color}</span>
              </p>
            </div>
          </div>

          {/* Product Details */}
          <div className="grid justify-center">
            <div className="lg:w-40">
              <PhoneD
                className={cn(`bg-${tw}`, "max-w-[150px] md:max-w-full")}
                imgSrc={order.configuration.croppedImageUrl!}
              />
            </div>
          </div>

          {/* Shipping Address */}
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Shipping Address</h2>
            <div className="bg-muted/20 p-4 rounded-md">
              <p className="text-foreground">{order.shippingAddress?.name}</p>
              <p className="text-foreground">{order.shippingAddress?.street}</p>
              <p className="text-foreground">
                {order.shippingAddress?.city}, {order.shippingAddress?.state}{" "}
                {order.shippingAddress?.postalCode}
              </p>
              <p className="text-foreground">{order.shippingAddress?.country}</p>
            </div>
          </div>

          {/* Tracking Timeline */}
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Tracking Timeline</h2>
            
            <div className="space-y-4">
              <div
                className={`flex items-center ${order.status === "awaiting_shipment" ? "text-primary" : "text-green-600"}`}
              >
                <div className="w-4 h-4 rounded-full bg-current transition-colors duration-300"></div>
                <div className="ml-4">
                  <p className="font-medium flex gap-5">
                    <span className="text-foreground">Order Confirmed</span>
                    <PackageOpen className="text-foreground transition-colors duration-300"/>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.createdAt.toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center ${order.status === "fulfilled" ? "text-primary" : order.status === "shipped" ? "text-green-600" : "text-muted-foreground/40"}`}
              >
                <div className="w-4 h-4 rounded-full bg-current transition-colors duration-300"></div>
                <div className="ml-4">
                  <p className="font-medium flex gap-5">
                    <span className="text-foreground">Order Fulfilled</span>
                    <Package className="text-foreground transition-colors duration-300"/>
                  </p>
                  {order.status === "fulfilled" ||
                  order.status === "shipped" ? (
                    <p className="text-sm text-muted-foreground">
                      Processing complete
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">Pending</p>
                  )}
                </div>
              </div>

              <div
                className={`flex items-center ${order.status === "shipped" ? "text-primary" : "text-muted-foreground/40"}`}
              >
                <div className="w-4 h-4 rounded-full bg-current transition-colors duration-300"></div>
                <div className="ml-4">
                  <p className="font-medium flex gap-5">
                    <span className="text-foreground">Order Shipped</span>
                    <Truck className="text-foreground transition-colors duration-300"/>
                  </p>
                  {order.status === "shipped" ? (
                    <p className="text-sm text-muted-foreground">
                      Your order is on its way
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">Pending</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
