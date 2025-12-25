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
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight, Loader2, Eye, Filter } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Ticket {
  id: string;
  subject: string;
  status: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  unreadCount: number;
  messageCount: number;
}

interface Pagination {
  page: number;
  totalPages: number;
  totalCount: number;
  itemsPerPage: number;
}

interface TicketsResponse {
  tickets: Ticket[];
  pagination: Pagination;
}

async function fetchTickets(
  page: number,
  statusFilter: string
): Promise<TicketsResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    ...(statusFilter && { status: statusFilter }),
  });

  const response = await fetch(`/api/admin/support?${params}`);
  if (!response.ok) {
    throw new Error("Failed to fetch tickets");
  }
  return response.json();
}

const STATUS_LABELS: Record<string, string> = {
  open: "Open",
  in_progress: "In Progress",
  resolved: "Resolved",
};

const STATUS_COLORS: Record<string, string> = {
  open: "bg-blue-500/10 text-blue-500",
  in_progress: "bg-yellow-500/10 text-yellow-500",
  resolved: "bg-green-500/10 text-green-500",
};

export default function SupportMessagesClient() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("");

  // Reset to first page when status filter changes
  useEffect(() => {
    setPage(1);
  }, [statusFilter]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-support-tickets", page, statusFilter],
    queryFn: () => fetchTickets(page, statusFilter),
    staleTime: 30000,
  });

  return (
    <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
      <div className="flex flex-col gap-16">
        <h1 className="text-4xl font-bold tracking-tight lg:mt-16">
          Support Messages
        </h1>

        {/* Filters */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Status Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                {statusFilter ? STATUS_LABELS[statusFilter] : "All Status"}
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
              {data.pagination.totalCount} ticket{data.pagination.totalCount !== 1 ? "s" : ""} found
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
              Failed to load tickets. Please try again.
            </div>
          ) : !data || data.tickets.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-muted-foreground">
              No tickets found
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow className="border-b">
                    <TableHead>Subject</TableHead>
                    <TableHead className="hidden sm:table-cell">Customer</TableHead>
                    <TableHead className="hidden sm:table-cell">Status</TableHead>
                    <TableHead className="hidden md:table-cell">Created</TableHead>
                    <TableHead className="hidden lg:table-cell">Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {data.tickets.map((ticket) => (
                    <TableRow
                      key={ticket.id}
                      className="bg-accent border-b last:border-b-0"
                    >
                      <TableCell>
                        <div className="font-medium flex items-center gap-2">
                          {ticket.subject}
                          {ticket.unreadCount > 0 && (
                            <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
                              {ticket.unreadCount > 9 ? "9+" : ticket.unreadCount}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground md:hidden">
                          {ticket.name} ({ticket.email})
                        </div>
                        <div className="text-sm text-muted-foreground sm:hidden">
                          {STATUS_LABELS[ticket.status] || ticket.status}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="font-medium">{ticket.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {ticket.email}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <span
                          className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            STATUS_COLORS[ticket.status] ||
                              "bg-muted text-muted-foreground"
                          )}
                        >
                          {STATUS_LABELS[ticket.status] || ticket.status}
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {new Date(ticket.updatedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link
                          href={`/admin/support/${ticket.id}`}
                          className={buttonVariants({
                            variant: "outline",
                            size: "sm",
                            className: "gap-2",
                          })}
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Link>
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
                    of {data.pagination.totalCount} tickets
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

