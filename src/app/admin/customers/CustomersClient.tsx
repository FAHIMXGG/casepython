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
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Search, ChevronLeft, ChevronRight, Loader2, ArrowUp, ArrowDown } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Customer {
  id: string;
  email: string;
  createdAt: string;
  totalOrders: number;
  totalSpent: number;
}

interface Pagination {
  page: number;
  totalPages: number;
  totalCount: number;
  itemsPerPage: number;
}

interface CustomersResponse {
  customers: Customer[];
  pagination: Pagination;
}

async function fetchCustomers(
  page: number,
  search: string,
  sortBy: string | null,
  sortOrder: string | null
): Promise<CustomersResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    ...(sortBy && { sortBy }),
    ...(sortOrder && { sortOrder }),
    ...(search && { search }),
  });

  const response = await fetch(`/api/admin/customers?${params}`);
  if (!response.ok) {
    throw new Error("Failed to fetch customers");
  }
  return response.json();
}

type SortField = "createdAt" | "totalOrders" | "totalSpent" | null;
type SortOrder = "asc" | "desc" | null;

export default function CustomersClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to first page when search changes
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["customers", page, debouncedSearch, sortBy, sortOrder],
    queryFn: () => fetchCustomers(page, debouncedSearch, sortBy, sortOrder),
    staleTime: 30000, // Cache for 30 seconds
  });

  const handleSort = (field: "createdAt" | "totalOrders" | "totalSpent") => {
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

  const SortIcon = ({ field }: { field: "createdAt" | "totalOrders" | "totalSpent" }) => {
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

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  return (
    <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
      <div className="flex flex-col gap-16">
        <div>
          <h1 className="text-4xl font-bold tracking-tight lg:mt-16">
            Customers
          </h1>
          <p className="text-muted-foreground mt-2">
            Users releted more control in{" "}
            <Link
              href="https://dashboard.clerk.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Clerk Dashboard
            </Link>
          </p>
        </div>

        {/* Search Input */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by email..."
              value={search}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
          {data && (
            <div className="text-sm text-muted-foreground">
              {data.pagination.totalCount} customer{data.pagination.totalCount !== 1 ? "s" : ""} found
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
              Failed to load customers. Please try again.
            </div>
          ) : !data || data.customers.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-muted-foreground">
              No customers found
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow className="border-b">
                    <TableHead>Email</TableHead>
                    <TableHead 
                      className="hidden sm:table-cell cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleSort("createdAt")}
                    >
                      <div className="flex items-center">
                        Member Since
                        <SortIcon field="createdAt" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="hidden sm:table-cell cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleSort("totalOrders")}
                    >
                      <div className="flex items-center">
                        Total Orders
                        <SortIcon field="totalOrders" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="text-right cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleSort("totalSpent")}
                    >
                      <div className="flex items-center justify-end">
                        Total Spent
                        <SortIcon field="totalSpent" />
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {data.customers.map((customer) => (
                    <TableRow
                      key={customer.id}
                      className="bg-accent border-b last:border-b-0"
                    >
                      <TableCell className="font-medium">
                        {customer.email}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {new Date(customer.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {customer.totalOrders}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatPrice(customer.totalSpent)}
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
                    of {data.pagination.totalCount} customers
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

