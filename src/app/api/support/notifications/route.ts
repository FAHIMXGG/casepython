import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return NextResponse.json({ count: 0 });
    }

    // Count unread messages from admin for this user
    const unreadCount = await db.supportMessage.count({
      where: {
        ticket: {
          userId: user.id,
        },
        isFromAdmin: true,
        isRead: false,
      },
    });

    return NextResponse.json({ count: unreadCount });
  } catch (error) {
    console.error("Error fetching notification count:", error);
    return NextResponse.json({ count: 0 });
  }
}

