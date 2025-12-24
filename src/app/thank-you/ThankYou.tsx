"use client";

import React from "react";
import { getPaymentStatus } from "./actions";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import PhonePreview from "@/components/PhonePreview";
import { formatPrice } from "@/lib/utils";

const ThankYou = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "";
  const { data } = useQuery({
    queryKey: ["payment-status"],
    queryFn: async () => await getPaymentStatus({ orderId }),
    retry: true,
    retryDelay: 500,
  });

  if (data === undefined) {
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground transition-colors duration-300" />
          <h3 className="font-semibold text-xl text-foreground transition-colors duration-300">Loading your order...</h3>
          <p className="text-muted-foreground transition-colors duration-300">This won't take long.</p>
        </div>
      </div>
    );
  }
  if (data === false) {
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground transition-colors duration-300" />
          <h3 className="font-semibold text-xl text-foreground transition-colors duration-300">Verifying your payment...</h3>
          <p className="text-muted-foreground transition-colors duration-300">This might take a moment...</p>
        </div>
      </div>
    );
  }

  const { configuration, billingAddress, shippingAddress, amount } = data;
  const { color } = configuration;

  return (
    <div className="bg-background transition-colors duration-300">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl">
          <p className="text-base font-medium text-primary transition-colors duration-300">Thank you!</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl text-foreground transition-colors duration-300">
            Your case is on the way!
          </h1>
          <p className="mt-2 text-base text-muted-foreground transition-colors duration-300">
            We've received your order and are now processing it.
          </p>

          <div className="mt-12 text-sm font-medium">
            <p className="text-foreground transition-colors duration-300">Order number</p>
            <p className="mt-2 text-muted-foreground transition-colors duration-300">{orderId}</p>
          </div>
        </div>

        <div className="mt-10 border-t border-border transition-colors duration-300">
          <div className="mt-10 flex flex-auto flex-col">
            <h4 className="font-semibold text-foreground transition-colors duration-300">
              You made a great choice!
            </h4>
            <p className="mt-2 text-sm text-muted-foreground transition-colors duration-300">
              We at CasePython believe that a phone case doesn't only need to
              look good, but also last you for the years to come. We offer a
              5-year print guarantee: If you case isn't of the highest quality,
              we'll replace it for free.
            </p>
          </div>
        </div>

        <div className="flex space-x-6 overflow-hidden mt-4 rounded-xl bg-muted/50 ring-1 ring-inset ring-border lg:rounded-2xl transition-colors duration-300">
          <PhonePreview
            croppedImageUrl={configuration.croppedImageUrl!}
            color={color!}
          />
        </div>

        <div>
          <div className="grid grid-cols-2 gap-x-6 py-10 text-sm">
            <div>
              <p className="font-medium text-foreground transition-colors duration-300">Shipping address</p>
              <div className="mt-2 text-muted-foreground transition-colors duration-300">
                <address className="not-italic">
                  <span className="block">{shippingAddress?.name}</span>
                  <span className="block">{shippingAddress?.street}</span>
                  <span className="block">
                    {shippingAddress?.postalCode} {shippingAddress?.city}
                  </span>
                </address>
              </div>
            </div>
            <div>
              <p className="font-medium text-foreground transition-colors duration-300">Billing address</p>
              <div className="mt-2 text-muted-foreground transition-colors duration-300">
                <address className="not-italic">
                  <span className="block">{billingAddress?.name}</span>
                  <span className="block">{billingAddress?.street}</span>
                  <span className="block">
                    {billingAddress?.postalCode} {billingAddress?.city}
                  </span>
                </address>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 border-t border-border py-10 text-sm transition-colors duration-300">
            <div>
              <p className="font-medium text-foreground transition-colors duration-300">Payment status</p>
              <p className="mt-2 text-muted-foreground transition-colors duration-300">Paid</p>
            </div>

            <div>
              <p className="font-medium text-foreground transition-colors duration-300">Shipping Method</p>
              <p className="mt-2 text-muted-foreground transition-colors duration-300">
                DHL, takes up to 3 working days
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 border-t border-border pt-10 text-sm transition-colors duration-300">
          <div className="flex justify-between">
            <p className="font-medium text-foreground transition-colors duration-300">Subtotal</p>
            <p className="text-muted-foreground transition-colors duration-300">{formatPrice(amount)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-foreground transition-colors duration-300">Shipping</p>
            <p className="text-muted-foreground transition-colors duration-300">{formatPrice(0)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-foreground transition-colors duration-300">Total</p>
            <p className="text-muted-foreground transition-colors duration-300">{formatPrice(amount)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
