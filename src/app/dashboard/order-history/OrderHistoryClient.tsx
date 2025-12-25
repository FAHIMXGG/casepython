"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatPrice, cn } from "@/lib/utils";
import Phone from "@/components/Phone";
import { COLORS } from "@/validators/option-validator";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface Order {
  id: string;
  status: string;
  amount: number;
  createdAt: string;
  configuration: {
    croppedImageUrl: string | null;
    model: string | null;
    color: string | null;
  };
}

interface Pagination {
  page: number;
  totalPages: number;
  totalCount: number;
  itemsPerPage: number;
}

interface OrdersResponse {
  orders: Order[];
  pagination: Pagination;
}

async function fetchOrderHistory(page: number): Promise<OrdersResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
  });

  const response = await fetch(`/api/user/orders/history?${params}`);
  if (!response.ok) {
    throw new Error("Failed to fetch order history");
  }
  return response.json();
}

export default function OrderHistoryClient() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["order-history", page],
    queryFn: () => fetchOrderHistory(page),
    staleTime: 30000, // Cache for 30 seconds
  });

  return (
    <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
      <div className="flex flex-col gap-16">
        <h1 className="text-4xl font-bold tracking-tight lg:mt-16">
          Order History
        </h1>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-12 text-destructive">
            Failed to load order history. Please try again.
          </div>
        ) : !data || data.orders.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground mb-4">
              You haven't placed any orders yet.
            </p>
            <Link href="/" className={buttonVariants({ variant: "default" })}>
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
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
                  {data.orders.map((order) => {
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
                          {new Date(order.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatPrice(order.amount)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end">
                            <Link
                              href={`/track?orderId=${order.id}`}
                              className={buttonVariants({
                                size: "sm",
                                variant: "outline",
                              })}
                            >
                              View Details
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {data.pagination.totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-border px-4 py-4">
                <div className="text-sm text-muted-foreground">
                  Showing {(page - 1) * data.pagination.itemsPerPage + 1} to{" "}
                  {Math.min(
                    page * data.pagination.itemsPerPage,
                    data.pagination.totalCount
                  )}{" "}
                  of {data.pagination.totalCount} orders
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1 || isLoading}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    Page {page} of {data.pagination.totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setPage((p) =>
                        Math.min(data.pagination.totalPages, p + 1)
                      )
                    }
                    disabled={
                      page === data.pagination.totalPages || isLoading
                    }
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

