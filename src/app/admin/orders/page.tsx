import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/db";
import { formatPrice } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import StatusDropdown from "../StatusDropdown";

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
    include: {
      user: true,
      shippingAddress: true,
    },
  });

  return (
    <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
      <div className="flex flex-col gap-16">
        <h1 className="text-4xl font-bold tracking-tight lg:mt-16">
          Manage Orders
        </h1>

        <div className="rounded-lg border border-border overflow-hidden bg-card">
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Purchase date
                </TableHead>
                <TableHead className="text-right">Amount</TableHead>
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
                    <TableCell className="font-mono text-xs">
                      {order.id.slice(0, 8)}...
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {order.shippingAddress?.name || "N/A"}
                      </div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {order.user.email}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <StatusDropdown id={order.id} orderStatus={order.status} />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {order.createdAt.toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatPrice(order.amount)}
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

