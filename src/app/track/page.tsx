import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import React from "react";
import { OrderStatus } from "@prisma/client";
import Image from "next/image";
import { cn, formatPrice } from "@/lib/utils";
import Phone from "@/components/Phone";
import { COLORS } from "@/validators/option-validator";
import {Package, PackageOpen, Truck,} from "lucide-react";

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
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Order Tracking</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order Details */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Order Details</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Order ID:</span> {order.id}
              </p>
              <p className="font-bold">
                <span className="font-medium ">Status:</span>{" "}
                {LABEL_MAP[order.status]}
              </p>
              <p>
                <span className="font-medium">Order Date:</span>{" "}
                {order.createdAt.toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Amount:</span>{" "}
                {formatPrice(order.amount)}
              </p>
              <p>
                <span className="font-medium">Model:</span>{" "}
                {order.configuration.model}
              </p>
              <p>
                <span className="font-medium">Color:</span>{" "}
                {order.configuration.color}
              </p>
            </div>
          </div>

          {/* Product Details */}
          <div className="grid justify-center">
            <div className="lg:w-40">
              <Phone
                className={cn(`bg-${tw}`, "max-w-[150px] md:max-w-full")}
                imgSrc={order.configuration.croppedImageUrl!}
              />
            </div>
          </div>

          {/* Shipping Address */}
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
            <div className="bg-muted/20 p-4 rounded-md">
              <p>{order.shippingAddress?.name}</p>
              <p>{order.shippingAddress?.street}</p>
              <p>
                {order.shippingAddress?.city}, {order.shippingAddress?.state}{" "}
                {order.shippingAddress?.postalCode}
              </p>
              <p>{order.shippingAddress?.country}</p>
            </div>
          </div>

          {/* Tracking Timeline */}
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Tracking Timeline</h2>
            
            <div className="space-y-4">
              <div
                className={`flex items-center ${order.status === "awaiting_shipment" ? "text-[#E4335A]" : "text-green-600"}`}
              >
                <div className="w-4 h-4 rounded-full bg-current"></div>
                <div className="ml-4">
                  <p className="font-medium flex gap-5">Order Confirmed <PackageOpen/></p>
                  <p className="text-sm text-muted-foreground">
                    {order.createdAt.toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center ${order.status === "fulfilled" ? "text-[#E4335A]" : order.status === "shipped" ? "text-green-600" : "text-gray-300"}`}
              >
                <div className="w-4 h-4 rounded-full bg-current"></div>
                <div className="ml-4">
                  <p className="font-medium flex gap-5">Order Fulfilled <Package/></p>
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
                className={`flex items-center ${order.status === "shipped" ? "text-[#E4335A]" : "text-gray-300"}`}
              >
                <div className="w-4 h-4 rounded-full bg-current"></div>
                <div className="ml-4">
                  <p className="font-medium flex gap-5">Order Shipped <Truck/></p>
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
