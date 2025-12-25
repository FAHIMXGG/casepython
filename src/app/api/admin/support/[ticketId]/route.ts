import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { SupportTicketStatus } from "@prisma/client";

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { ticketId: string } }
) {
  try {
    const user = await currentUser();
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

    if (!user || user.primaryEmailAddress?.emailAddress !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const ticket = await db.supportTicket.findUnique({
      where: {
        id: params.ticketId,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    // Mark all user messages as read
    await db.supportMessage.updateMany({
      where: {
        ticketId: params.ticketId,
        isFromAdmin: false,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    return NextResponse.json({ ticket });
  } catch (error) {
    console.error("Error fetching ticket:", error);
    return NextResponse.json(
      { error: "Failed to fetch ticket" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { ticketId: string } }
) {
  try {
    const user = await currentUser();
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

    if (!user || user.primaryEmailAddress?.emailAddress !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Check if ticket exists
    const ticket = await db.supportTicket.findUnique({
      where: { id: params.ticketId },
    });

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    // Add message from admin
    const newMessage = await db.supportMessage.create({
      data: {
        ticketId: params.ticketId,
        message,
        isFromAdmin: true,
      },
    });

    // Update ticket status to in_progress if it's open
    if (ticket.status === "open") {
      await db.supportTicket.update({
        where: { id: params.ticketId },
        data: {
          status: "in_progress",
          updatedAt: new Date(),
        },
      });
    } else {
      await db.supportTicket.update({
        where: { id: params.ticketId },
        data: { updatedAt: new Date() },
      });
    }

    return NextResponse.json({ message: newMessage }, { status: 201 });
  } catch (error) {
    console.error("Error adding message:", error);
    return NextResponse.json(
      { error: "Failed to add message" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { ticketId: string } }
) {
  try {
    const user = await currentUser();
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

    if (!user || user.primaryEmailAddress?.emailAddress !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { status } = body;

    if (!status || !Object.values(SupportTicketStatus).includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    // Update ticket status
    const updatedTicket = await db.supportTicket.update({
      where: { id: params.ticketId },
      data: {
        status: status as SupportTicketStatus,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ ticket: updatedTicket });
  } catch (error) {
    console.error("Error updating ticket:", error);
    return NextResponse.json(
      { error: "Failed to update ticket" },
      { status: 500 }
    );
  }
}

