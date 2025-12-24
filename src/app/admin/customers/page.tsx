import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/utils";

const Page = async () => {
  const user = await currentUser();
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

  if (!user || user.primaryEmailAddress?.emailAddress !== ADMIN_EMAIL) {
    return notFound();
  }

  const customers = await db.user.findMany({
    include: {
      order: {
        where: {
          isPaid: true,
        },
        select: {
          amount: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
      <div className="flex flex-col gap-16">
        <h1 className="text-4xl font-bold tracking-tight lg:mt-16">
          Customers
        </h1>

        <div className="rounded-lg border border-border overflow-hidden bg-card">
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead>Email</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Member Since
                </TableHead>
                <TableHead className="hidden sm:table-cell">
                  Total Orders
                </TableHead>
                <TableHead className="text-right">Total Spent</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {customers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No customers found
                  </TableCell>
                </TableRow>
              ) : (
                customers.map((customer) => {
                  const totalSpent = customer.order.reduce(
                    (sum, order) => sum + order.amount,
                    0
                  );

                  return (
                    <TableRow
                      key={customer.id}
                      className="bg-accent border-b last:border-b-0"
                    >
                      <TableCell className="font-medium">
                        {customer.email}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {customer.createdAt.toLocaleDateString()}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {customer.order.length}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatPrice(totalSpent)}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Page;

