import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { db } from "@/db";
import { formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";
import React from "react";
import StatusDropdown from "./StatusDropdown";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Eye } from "lucide-react";
import DownloadOrderPDF from "./orders/DownloadOrderPDF";

//2259

const Page = async () => {
  const user = await currentUser();

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

  if (!user || user.primaryEmailAddress?.emailAddress !== ADMIN_EMAIL) {
    return notFound();
  }

  const orders = await db.order.findMany({
    where: {
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5, // Latest 5 orders
    include: {
      user: true,
      shippingAddress: true,
      configuration: {
        select: {
          model: true,
          color: true,
          material: true,
          finish: true,
          croppedImageUrl: true,
          imageUrl: true,
        },
      },
    },
  });

  const lastWeekSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
    _sum: {
      amount: true,
    },
  });

  const lastMonthSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
    },
    _sum: {
      amount: true,
    },
  });

  const WEEKLY_GOAL = 500;
  const MONTHLY_GOAL = 2500;

  return (
    <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
      <div className="flex flex-col gap-16">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Last Week</CardDescription>
                <CardTitle className="text-4xl">
                  {formatPrice(lastWeekSum._sum.amount ?? 0)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  of {formatPrice(WEEKLY_GOAL)} goal
                </div>
              </CardContent>
              <CardFooter>
                <Progress
                  value={((lastWeekSum._sum.amount ?? 0) * 100) / WEEKLY_GOAL}
                />
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Last Month</CardDescription>
                <CardTitle className="text-4xl">
                  {formatPrice(lastMonthSum._sum.amount ?? 0)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  of {formatPrice(MONTHLY_GOAL)} goal
                </div>
              </CardContent>
              <CardFooter>
                <Progress
                  value={((lastMonthSum._sum.amount ?? 0) * 100) / MONTHLY_GOAL}
                />
              </CardFooter>
            </Card>
          </div>

          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold tracking-tight lg:mt-16">Latest Orders</h1>
            <Link
              href="/admin/orders"
              className={buttonVariants({
                variant: "outline",
                size: "sm",
              })}
            >
              View All Orders
            </Link>
          </div>

          <div className="rounded-lg border border-border overflow-hidden bg-card">
            <Table>
              <TableHeader>
                <TableRow className="border-b">
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Purchase date
                  </TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {orders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No orders found
                    </TableCell>
                  </TableRow>
                ) : (
                  orders.map((order) => (
                    <TableRow key={order.id} className="bg-accent border-b last:border-b-0">
                      <TableCell>
                        <div className="font-medium">
                          {order.shippingAddress?.name || "N/A"}
                        </div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {order.user.email}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <StatusDropdown id={order.id} orderStatus={order.status}/>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {order.createdAt.toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatPrice(order.amount)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <DownloadOrderPDF
                            orderId={order.id}
                            model={order.configuration?.model || null}
                            designImageUrl={order.configuration?.croppedImageUrl || order.configuration?.imageUrl || null}
                            caseColor={order.configuration?.color || null}
                            color={order.configuration?.color || null}
                            material={order.configuration?.material || null}
                            finish={order.configuration?.finish || null}
                          />
                          <Link
                            href={`/admin/orders/view?orderId=${order.id}`}
                            className={buttonVariants({
                              variant: "outline",
                              size: "sm",
                              className: "gap-2",
                            })}
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
  );
};

export default Page;
