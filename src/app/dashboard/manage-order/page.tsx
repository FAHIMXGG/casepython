import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import Phone from "@/components/Phone";
import { COLORS } from "@/validators/option-validator";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Page = async () => {
  const user = await currentUser();

  if (!user?.id) {
    return notFound();
  }

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

  if (user.primaryEmailAddress?.emailAddress === ADMIN_EMAIL) {
    return notFound();
  }

  const orders = await db.order.findMany({
    where: {
      userId: user.id,
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      configuration: {
        select: {
          croppedImageUrl: true,
          model: true,
          color: true,
        },
      },
      shippingAddress: true,
    },
  });

  const activeOrders = orders.filter(
    (order) => order.status !== "fulfilled"
  );

  return (
    <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
      <div className="flex flex-col gap-16">
        <h1 className="text-4xl font-bold tracking-tight lg:mt-16">
          Manage Order
        </h1>

        {activeOrders.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No Active Orders</CardTitle>
              <CardDescription>
                You don't have any active orders to manage at the moment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href="/"
                className={buttonVariants({ variant: "default" })}
              >
                Browse Products
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="rounded-lg border border-border overflow-hidden bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="hidden sm:table-cell">Product</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Order Date
                  </TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {activeOrders.map((order) => {
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
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {order.configuration.model} - {order.configuration.color}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <span className="capitalize">
                          {order.status.replace("_", " ")}
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {order.createdAt.toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatPrice(order.amount)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/track?orderId=${order.id}`}
                            className={buttonVariants({
                              size: "sm",
                              variant: "outline",
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
        )}
      </div>
    </div>
  );
};

export default Page;

