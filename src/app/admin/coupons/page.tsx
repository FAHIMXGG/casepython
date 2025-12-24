import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { getCoupons } from "./actions";
import { CouponActions } from "./CouponActions";
import { CouponPageClient } from "./CouponPageClient";

const Page = async () => {
  const user = await currentUser();
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

  if (!user || user.primaryEmailAddress?.emailAddress !== ADMIN_EMAIL) {
    return notFound();
  }

  const coupons = await getCoupons();

  return (
    <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
      <div className="flex flex-col gap-16">
        <CouponPageClient coupons={coupons} />

        <Card>
          <CardHeader>
            <CardTitle>Coupons</CardTitle>
            <CardDescription>
              Manage discount coupons and promotional codes
            </CardDescription>
          </CardHeader>
          <CardContent>
            {coupons.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No coupons created yet. Click "Create Coupon" to get started.</p>
              </div>
            ) : (
              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Discount</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Uses</TableHead>
                      <TableHead>Valid Until</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {coupons.map((coupon) => (
                      <TableRow key={coupon.id}>
                        <TableCell className="font-mono font-semibold">
                          {coupon.code}
                        </TableCell>
                        <TableCell>{coupon.discount}%</TableCell>
                        <TableCell className="max-w-xs truncate">
                          {coupon.description || "-"}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              coupon.isActive
                                ? "bg-green-500/10 text-green-700 dark:text-green-400"
                                : "bg-gray-500/10 text-gray-700 dark:text-gray-400"
                            }`}
                          >
                            {coupon.isActive ? "Active" : "Inactive"}
                          </span>
                        </TableCell>
                        <TableCell>
                          {coupon.maxUses
                            ? `${coupon.usedCount}/${coupon.maxUses}`
                            : coupon.usedCount}
                        </TableCell>
                        <TableCell>
                          {coupon.validUntil
                            ? new Date(coupon.validUntil).toLocaleDateString()
                            : "No expiry"}
                        </TableCell>
                        <TableCell className="text-right">
                          <CouponActions coupon={coupon} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
