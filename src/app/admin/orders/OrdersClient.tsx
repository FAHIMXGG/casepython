"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Search, ChevronLeft, ChevronRight, Loader2, ArrowUp, ArrowDown, Filter, Eye, Download } from "lucide-react";
import StatusDropdown from "../StatusDropdown";
import { OrderStatus } from "@prisma/client";
import Link from "next/link";
import DownloadOrderPDF from "./DownloadOrderPDF";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Order {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  status: OrderStatus;
  purchaseDate: string;
  amount: number;
  configuration: {
    model: string | null;
    color: string | null;
    material: string | null;
    finish: string | null;
    imageUrl: string;
  } | null;
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

async function fetchOrders(
  page: number,
  search: string,
  sortBy: string,
  sortOrder: string,
  statusFilter: string
): Promise<OrdersResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    sortBy,
    sortOrder,
    ...(search && { search }),
    ...(statusFilter && { status: statusFilter }),
  });

  const response = await fetch(`/api/admin/orders?${params}`);
  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }
  return response.json();
}

type SortField = "createdAt" | "amount" | "status" | null;
type SortOrder = "asc" | "desc" | null;

const STATUS_LABELS: Record<OrderStatus, string> = {
  awaiting_shipment: "Awaiting Shipment",
  fulfilled: "Fulfilled",
  shipped: "Shipped",
};

export default function OrdersClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [statusFilter, setStatusFilter] = useState<string>("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to first page when search changes
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // Reset to first page when status filter changes
  useEffect(() => {
    setPage(1);
  }, [statusFilter]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["orders", page, debouncedSearch, sortBy, sortOrder, statusFilter],
    queryFn: () => fetchOrders(page, debouncedSearch, sortBy || "createdAt", sortOrder || "desc", statusFilter),
    staleTime: 30000, // Cache for 30 seconds
  });

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const handleSort = (field: "createdAt" | "amount" | "status") => {
    if (sortBy === field) {
      // Cycle through: asc -> desc -> default (null) -> asc
      if (sortOrder === "asc") {
        setSortOrder("desc");
      } else if (sortOrder === "desc") {
        // Third click: reset to default
        setSortBy(null);
        setSortOrder(null);
      } else {
        // If null, start over with asc
        setSortBy(field);
        setSortOrder("asc");
      }
    } else {
      // Set new sort field and start with asc
      setSortBy(field);
      setSortOrder("asc");
    }
    setPage(1); // Reset to first page when sorting changes
  };

  const SortIcon = ({ field }: { field: "createdAt" | "amount" | "status" }) => {
    if (sortBy !== field) {
      return (
        <div className="ml-1 flex flex-col">
          <ArrowUp className="h-3 w-3 text-muted-foreground/50" />
          <ArrowDown className="h-3 w-3 -mt-1 text-muted-foreground/50" />
        </div>
      );
    }
    if (sortOrder === "asc") {
      return <ArrowUp className="ml-1 h-4 w-4 text-primary" />;
    } else if (sortOrder === "desc") {
      return <ArrowDown className="ml-1 h-4 w-4 text-primary" />;
    } else {
      // Default state - show both arrows (neutral)
      return (
        <div className="ml-1 flex flex-col">
          <ArrowUp className="h-3 w-3 text-muted-foreground/50" />
          <ArrowDown className="h-3 w-3 -mt-1 text-muted-foreground/50" />
        </div>
      );
    }
  };

  return (
    <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
      <div className="flex flex-col gap-16">
        <h1 className="text-4xl font-bold tracking-tight lg:mt-16">
          Manage Orders
        </h1>

        {/* Search Input and Filters */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by order ID, customer name, or email..."
              value={search}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
          
          {/* Status Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                {statusFilter ? STATUS_LABELS[statusFilter as OrderStatus] : "All Status"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setStatusFilter("")}
                className={statusFilter === "" ? "bg-accent" : ""}
              >
                All Status
              </DropdownMenuItem>
              {Object.entries(STATUS_LABELS).map(([status, label]) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={statusFilter === status ? "bg-accent" : ""}
                >
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {data && (
            <div className="text-sm text-muted-foreground">
              {data.pagination.totalCount} order{data.pagination.totalCount !== 1 ? "s" : ""} found
            </div>
          )}
        </div>

        {/* Table */}
        <div className="rounded-lg border border-border overflow-hidden bg-card">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-12 text-destructive">
              Failed to load orders. Please try again.
            </div>
          ) : !data || data.orders.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-muted-foreground">
              No orders found
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow className="border-b">
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead 
                      className="hidden sm:table-cell cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleSort("status")}
                    >
                      <div className="flex items-center">
                        Status
                        <SortIcon field="status" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="hidden sm:table-cell cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleSort("createdAt")}
                    >
                      <div className="flex items-center">
                        Purchase date
                        <SortIcon field="createdAt" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="text-right cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleSort("amount")}
                    >
                      <div className="flex items-center justify-end">
                        Amount
                        <SortIcon field="amount" />
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {data.orders.map((order) => (
                    <TableRow key={order.id} className="bg-accent border-b last:border-b-0">
                      <TableCell className="font-mono text-xs">
                        {order.orderId}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {order.customerName}
                        </div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {order.customerEmail}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <StatusDropdown id={order.id} orderStatus={order.status} />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(order.purchaseDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatPrice(order.amount)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <DownloadOrderPDF
                            orderId={order.id}
                            model={order.configuration?.model || null}
                            designImageUrl={order.configuration?.imageUrl || null}
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
                  ))}
                </TableBody>
              </Table>

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
    </div>
  );
}

