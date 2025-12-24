import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { cn, formatPrice } from "@/lib/utils";
import Phone from "@/components/Phone";
import { COLORS } from "@/validators/option-validator";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const Page = async () => {
  const user = await currentUser();

  if (!user?.id) {
    return notFound();
  }

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

  // Prevent admins from accessing the dashboard
  if (user.primaryEmailAddress?.emailAddress === ADMIN_EMAIL) {
    return notFound();
  }

  const orders = await db.order.findMany({
    where: {
      userId: user.id,
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
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

  return (
    <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
      <div className="flex flex-col gap-16">
          <h1 className="text-4xl font-bold tracking-tight lg:mt-16">
            Your orders
          </h1>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead className="hidden sm:table-cell">Name</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Purchase date
                </TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Track</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.map((order) => {
                const tw = COLORS.find(
                  (supportedColor) =>
                    supportedColor.value === order.configuration.color
                )?.tw;

                return (
                  <TableRow key={order.id} className="bg-accent">
                    <TableCell>
                      <div className="w-10">
                        <Phone
                          className={cn(
                            `bg-${tw}`,
                            "max-w-[150px] md:max-w-full"
                          )}
                          imgSrc={order.configuration.croppedImageUrl!}
                        />
                      </div>
                      <div className="hidden text-sm text-muted-foreground md:inline"></div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {order.configuration.model} - {order.configuration.color}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {order.createdAt.toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatPrice(order.amount)}
                    </TableCell>
                    <TableCell className="text-right ">
                      <div className="flex justify-end">
                        <Link
                          href={`/track?orderId=${order.id}`}
                          className={buttonVariants({
                            size: "sm",
                            className: "sm:flex items-center gap-1 w-20",
                          })}
                        >
                          Track
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
  );
};

export default Page;
