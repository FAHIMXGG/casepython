import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { OrderStatus } from "@prisma/client";
import { cn, formatPrice } from "@/lib/utils";
import { COLORS } from "@/validators/option-validator";
import PhoneDB from "@/components/PhoneDB";
import StatusDropdown from "../../StatusDropdown";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import DownloadPDFButton from "./DownloadPDFButton";


const LABEL_MAP: Record<OrderStatus, string> = {
  awaiting_shipment: "Awaiting Shipment",
  fulfilled: "Fulfilled",
  shipped: "Shipped",
};

interface PageProps {
  searchParams: {
    orderId?: string;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const user = await currentUser();
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

  if (!user || user.primaryEmailAddress?.emailAddress !== ADMIN_EMAIL) {
    return notFound();
  }

  const orderId = searchParams.orderId;

  if (!orderId) {
    return notFound();
  }

  const order = await db.order.findFirst({
    where: {
      id: orderId,
      isPaid: true,
    },
    include: {
      user: true,
      shippingAddress: true,
      billingAddress: true,
      configuration: {
        select: {
          id: true,
          croppedImageUrl: true,
          imageUrl: true,
          model: true,
          color: true,
          material: true,
          finish: true,
        },
      },
    },
  });

  if (!order) {
    return notFound();
  }

  const tw = COLORS.find(
    (supportedColor) => supportedColor.value === order.configuration.color
  )?.tw;

  return (
    <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Link
              href="/admin/orders"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "mb-4",
              })}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Link>
            <h1 className="text-4xl font-bold tracking-tight">Order Details</h1>
            <p className="text-muted-foreground mt-2">Order ID: {order.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <StatusDropdown id={order.id} orderStatus={order.status} />
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order Date:</span>
                  <span className="font-medium">
                    {order.createdAt.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium">{formatPrice(order.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Status:</span>
                  <span className="font-medium text-green-600">Paid</span>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-muted-foreground">Email:</span>
                  <p className="font-medium">{order.user.email}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">User ID:</span>
                  <p className="font-mono text-sm">{order.userId}</p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            {order.shippingAddress && (
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                <div className="space-y-1 text-muted-foreground">
                  <p className="font-medium text-foreground">
                    {order.shippingAddress.name}
                  </p>
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                    {order.shippingAddress.postalCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                  {order.shippingAddress.phoneNumber && (
                    <p className="mt-2">Phone: {order.shippingAddress.phoneNumber}</p>
                  )}
                </div>
              </div>
            )}

            {/* Billing Address */}
            {order.billingAddress && (
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
                <div className="space-y-1 text-muted-foreground">
                  <p className="font-medium text-foreground">
                    {order.billingAddress.name}
                  </p>
                  <p>{order.billingAddress.street}</p>
                  <p>
                    {order.billingAddress.city}, {order.billingAddress.state}{" "}
                    {order.billingAddress.postalCode}
                  </p>
                  <p>{order.billingAddress.country}</p>
                  {order.billingAddress.phoneNumber && (
                    <p className="mt-2">Phone: {order.billingAddress.phoneNumber}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Design Preview */}
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-semibold mb-4">Design Preview</h2>
              <div className="flex justify-center mb-6">
                <div className="w-48">
                  <PhoneDB
                    className={cn(`bg-${tw}`, "max-w-full")}
                    imgSrc={order.configuration.croppedImageUrl || order.configuration.imageUrl}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-muted-foreground">Model:</span>
                  <p className="font-medium capitalize">{order.configuration.model}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Color:</span>
                  <p className="font-medium capitalize">{order.configuration.color}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Material:</span>
                  <p className="font-medium capitalize">
                    {order.configuration.material || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Finish:</span>
                  <p className="font-medium capitalize">
                    {order.configuration.finish || "N/A"}
                  </p>
                </div>
                <div className="pt-4 border-t border-border space-y-2">
                  <DownloadPDFButton
                    orderId={order.id}
                    model={order.configuration.model || "Unknown"}
                    designImageUrl={order.configuration.croppedImageUrl || order.configuration.imageUrl}
                    caseColor={order.configuration.color || undefined}
                    color={order.configuration.color || undefined}
                    material={order.configuration.material || undefined}
                    finish={order.configuration.finish || undefined}
                  />
                  <Link
                    href={`/configure/preview?id=${order.configuration.id}`}
                    target="_blank"
                    className={buttonVariants({
                      variant: "outline",
                      size: "sm",
                      className: "w-full",
                    })}
                  >
                    View Full Design
                  </Link>
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

