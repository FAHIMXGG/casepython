"use client";

import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, ArrowLeft, Send, MessageSquare, CheckCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Message {
  id: string;
  message: string;
  isFromAdmin: boolean;
  createdAt: string;
}

interface Ticket {
  id: string;
  subject: string;
  status: string;
  email: string;
  name: string;
  messages: Message[];
}

async function fetchTicket(ticketId: string): Promise<{ ticket: Ticket }> {
  const response = await fetch(`/api/admin/support/${ticketId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch ticket");
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

export default function AdminTicketViewClient({
  ticketId,
}: {
  ticketId: string;
}) {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-support-ticket", ticketId],
    queryFn: () => fetchTicket(ticketId),
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  // Set status when ticket loads
  useEffect(() => {
    if (data?.ticket) {
      setStatus(data.ticket.status);
    }
  }, [data]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data?.ticket?.messages]);

  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await fetch(`/api/admin/support/${ticketId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to send message");
      }

      return response.json();
    },
    onSuccess: () => {
      setMessage("");
      queryClient.invalidateQueries({
        queryKey: ["admin-support-ticket", ticketId],
      });
      queryClient.invalidateQueries({ queryKey: ["admin-support-tickets"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to send message");
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async (newStatus: string) => {
      const response = await fetch(`/api/admin/support/${ticketId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update status");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Status updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["admin-support-ticket", ticketId],
      });
      queryClient.invalidateQueries({ queryKey: ["admin-support-tickets"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update status");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    sendMessageMutation.mutate(message);
    setIsSubmitting(false);
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    updateStatusMutation.mutate(newStatus);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl w-full mx-auto flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-4xl w-full mx-auto flex flex-col items-center justify-center py-12 text-destructive">
        <p>Failed to load ticket. Please try again.</p>
        <Link
          href="/admin/support"
          className={buttonVariants({ variant: "outline", className: "mt-4" })}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Support
        </Link>
      </div>
    );
  }

  const ticket = data.ticket;

  return (
    <div className="max-w-4xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link
            href="/admin/support"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight lg:mt-16">
              {ticket.subject}
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    STATUS_COLORS[ticket.status] ||
                      "bg-muted text-muted-foreground"
                  )}
                >
                  {STATUS_LABELS[ticket.status] || ticket.status}
                </span>
                <span className="text-sm text-muted-foreground">
                  {ticket.messages.length} message
                  {ticket.messages.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {ticket.name} ({ticket.email})
              </div>
            </div>
          </div>
        </div>

        {/* Status Selector */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">Status:</label>
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(STATUS_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {status === "resolved" && (
            <div className="flex items-center gap-2 text-green-500">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Resolved</span>
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="rounded-lg border border-border bg-card flex flex-col h-[600px]">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {ticket.messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <MessageSquare className="h-12 w-12 mb-4 opacity-50" />
                <p>No messages yet.</p>
              </div>
            ) : (
              ticket.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex",
                    msg.isFromAdmin ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg p-3",
                      msg.isFromAdmin
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                    <p
                      className={cn(
                        "text-xs mt-1",
                        msg.isFromAdmin
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      )}
                    >
                      {new Date(msg.createdAt).toLocaleString()}
                      {msg.isFromAdmin && " (Admin)"}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          {status !== "resolved" && (
            <form
              onSubmit={handleSubmit}
              className="border-t border-border p-4"
            >
              <div className="flex gap-2">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your response..."
                  rows={3}
                  className="resize-none"
                />
                <Button
                  type="submit"
                  disabled={!message.trim() || isSubmitting}
                  className="self-end"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </form>
          )}
          {status === "resolved" && (
            <div className="border-t border-border p-4 bg-green-500/10">
              <p className="text-sm text-green-500 text-center font-medium">
                This ticket has been marked as resolved.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

