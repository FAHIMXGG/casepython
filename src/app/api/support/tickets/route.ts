import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { SupportTicketStatus } from "@prisma/client";

export const dynamic = 'force-dynamic';

const ITEMS_PER_PAGE = 10;

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const skip = (page - 1) * ITEMS_PER_PAGE;

    // Get tickets for this user
    const where: any = {
      userId: user.id,
    };

    const totalCount = await db.supportTicket.count({ where });

    const tickets = await db.supportTicket.findMany({
      where,
      skip,
      take: ITEMS_PER_PAGE,
      include: {
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

    // Count unread messages for each ticket
    const ticketsWithUnread = await Promise.all(
      tickets.map(async (ticket) => {
        const unreadCount = await db.supportMessage.count({
          where: {
            ticketId: ticket.id,
            isFromAdmin: true,
            isRead: false,
          },
        });

        return {
          id: ticket.id,
          subject: ticket.subject,
          status: ticket.status,
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
    console.error("Error fetching tickets:", error);
    return NextResponse.json(
      { error: "Failed to fetch tickets" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { email, name, subject, message } = body;

    // Validate required fields
    if (!email || !name || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Ensure user exists in DB
    let dbUser = await db.user.findUnique({
      where: { id: user.id },
    });

    if (!dbUser) {
      dbUser = await db.user.create({
        data: {
          id: user.id,
          email: user.emailAddresses[0]?.emailAddress || email,
        },
      });
    }

    // Create ticket with initial message
    const ticket = await db.supportTicket.create({
      data: {
        userId: user.id,
        email,
        name,
        subject,
        messages: {
          create: {
            message,
            isFromAdmin: false,
          },
        },
      },
      include: {
        messages: true,
      },
    });

    return NextResponse.json({ ticket }, { status: 201 });
  } catch (error) {
    console.error("Error creating ticket:", error);
    return NextResponse.json(
      { error: "Failed to create ticket" },
      { status: 500 }
    );
  }
}

