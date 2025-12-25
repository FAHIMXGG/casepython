import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { OrderStatus } from "@prisma/client";

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
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const statusFilter = searchParams.get("status") || "";

    const skip = (page - 1) * ITEMS_PER_PAGE;

    // Build where clause for search and filters
    const where: any = {
      isPaid: true,
    };

    // Add status filter if provided
    if (statusFilter && Object.values(OrderStatus).includes(statusFilter as OrderStatus)) {
      where.status = statusFilter as OrderStatus;
    }

    if (search) {
      where.OR = [
        {
          id: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          user: {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
        {
          shippingAddress: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      ];
    }

    // Get total count for pagination
    const totalCount = await db.order.count({ where });

    // Build orderBy clause
    let orderBy: any = {};
    
    if (sortBy === "createdAt" || sortBy === "amount" || sortBy === "status") {
      orderBy[sortBy] = sortOrder === "asc" ? "asc" : "desc";
    } else {
      orderBy.createdAt = "desc"; // Default fallback
    }

    // Get orders with pagination, search, and sorting
    const orders = await db.order.findMany({
      where,
      skip,
      take: ITEMS_PER_PAGE,
      include: {
        user: {
          select: {
            email: true,
          },
        },
        shippingAddress: {
          select: {
            name: true,
          },
        },
        configuration: {
          select: {
            model: true,
            color: true,
            material: true,
            finish: true,
            croppedImageUrl: true,
            imageUrl: true,
          },
        },
      },
      orderBy,
    });

    // Format orders for response
    const formattedOrders = orders.map((order) => ({
      id: order.id,
      orderId: order.id.slice(0, 8) + "...",
      customerName: order.shippingAddress?.name || "N/A",
      customerEmail: order.user.email,
      status: order.status,
      purchaseDate: order.createdAt,
      amount: order.amount,
      configuration: order.configuration ? {
        model: order.configuration.model,
        color: order.configuration.color,
        material: order.configuration.material,
        finish: order.configuration.finish,
        imageUrl: order.configuration.croppedImageUrl || order.configuration.imageUrl,
      } : null,
    }));

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    return NextResponse.json({
      orders: formattedOrders,
      pagination: {
        page,
        totalPages,
        totalCount,
        itemsPerPage: ITEMS_PER_PAGE,
      },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

