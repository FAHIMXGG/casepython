import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { SupportTicketStatus } from "@prisma/client";

export const dynamic = 'force-dynamic';

const ITEMS_PER_PAGE = 10;

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

    if (!user || user.primaryEmailAddress?.emailAddress !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const statusFilter = searchParams.get("status") || "";
    const skip = (page - 1) * ITEMS_PER_PAGE;

    // Build where clause
    const where: any = {};

    if (statusFilter && Object.values(SupportTicketStatus).includes(statusFilter as SupportTicketStatus)) {
      where.status = statusFilter as SupportTicketStatus;
    }

    const totalCount = await db.supportTicket.count({ where });

    const tickets = await db.supportTicket.findMany({
      where,
      skip,
      take: ITEMS_PER_PAGE,
      include: {
        user: {
          select: {
            email: true,
          },
        },
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    // Count unread messages for each ticket (messages from users that admin hasn't read)
    const ticketsWithUnread = await Promise.all(
      tickets.map(async (ticket) => {
        const unreadCount = await db.supportMessage.count({
          where: {
            ticketId: ticket.id,
            isFromAdmin: false,
            isRead: false,
          },
        });

        return {
          id: ticket.id,
          subject: ticket.subject,
          status: ticket.status,
          email: ticket.email,
          name: ticket.name,
          createdAt: ticket.createdAt,
          updatedAt: ticket.updatedAt,
          unreadCount,
          messageCount: ticket.messages.length,
        };
      })
    );

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    return NextResponse.json({
      tickets: ticketsWithUnread,
      pagination: {
        page,
        totalPages,
        totalCount,
        itemsPerPage: ITEMS_PER_PAGE,
      },
    });
  } catch (error) {
    console.error("Error fetching support tickets:", error);
    return NextResponse.json(
      { error: "Failed to fetch support tickets" },
      { status: 500 }
    );
  }
}

