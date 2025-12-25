import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

const ITEMS_PER_PAGE = 10;

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    if (user.primaryEmailAddress?.emailAddress === ADMIN_EMAIL) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const skip = (page - 1) * ITEMS_PER_PAGE;

    // Get total count for pagination
    const totalCount = await db.order.count({
      where: {
        userId: user.id,
        isPaid: false,
      },
    });

    // Get pending orders with pagination
    const orders = await db.order.findMany({
      where: {
        userId: user.id,
        isPaid: false,
      },
      skip,
      take: ITEMS_PER_PAGE,
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        configuration: {
          select: {
            id: true,
            croppedImageUrl: true,
            model: true,
            color: true,
          },
        },
      },
    });

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    return NextResponse.json({
      orders,
      pagination: {
        page,
        totalPages,
        totalCount,
        itemsPerPage: ITEMS_PER_PAGE,
      },
    });
  } catch (error) {
    console.error("Error fetching pending orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch pending orders" },
      { status: 500 }
    );
  }
}

