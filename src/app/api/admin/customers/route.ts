import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const ITEMS_PER_PAGE = 15;

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
    
    // If sortBy or sortOrder is explicitly set to empty/null, use defaults
    const finalSortBy = searchParams.has("sortBy") && !searchParams.get("sortBy") ? "createdAt" : sortBy;
    const finalSortOrder = searchParams.has("sortOrder") && !searchParams.get("sortOrder") ? "desc" : sortOrder;

    const skip = (page - 1) * ITEMS_PER_PAGE;

    // Build where clause for search
    const where: any = {};
    if (search) {
      where.email = {
        contains: search,
        mode: "insensitive",
      };
    }

    // Get total count for pagination
    const totalCount = await db.user.count({ where });

    // For sorting by calculated fields (totalOrders, totalSpent), we need to fetch all matching records,
    // calculate the values, sort, then paginate. For createdAt, we can use Prisma's orderBy directly.
    let customers;
    
    if (finalSortBy === "createdAt") {
      // Direct database sorting for createdAt
      customers = await db.user.findMany({
        where,
        include: {
          order: {
            where: {
              isPaid: true,
            },
            select: {
              amount: true,
            },
          },
        },
        orderBy: {
          createdAt: finalSortOrder === "asc" ? "asc" : "desc",
        },
      });
    } else {
      // For calculated fields, fetch all matching records first
      customers = await db.user.findMany({
        where,
        include: {
          order: {
            where: {
              isPaid: true,
            },
            select: {
              amount: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc", // Default fallback
        },
      });
    }

    // Calculate total spent and total orders for each customer
    const customersWithTotal = customers.map((customer) => {
      const totalSpent = customer.order.reduce(
        (sum, order) => sum + order.amount,
        0
      );
      return {
        id: customer.id,
        email: customer.email,
        createdAt: customer.createdAt,
        totalOrders: customer.order.length,
        totalSpent,
      };
    });

    // Sort by calculated fields if needed
    if (finalSortBy === "totalOrders" || finalSortBy === "totalSpent") {
      customersWithTotal.sort((a, b) => {
        const aValue = a[finalSortBy as keyof typeof a] as number;
        const bValue = b[finalSortBy as keyof typeof b] as number;
        
        if (finalSortOrder === "asc") {
          return aValue - bValue;
        } else {
          return bValue - aValue;
        }
      });
    }

    // Apply pagination after sorting
    const paginatedCustomers = customersWithTotal.slice(skip, skip + ITEMS_PER_PAGE);

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    return NextResponse.json({
      customers: paginatedCustomers,
      pagination: {
        page,
        totalPages,
        totalCount,
        itemsPerPage: ITEMS_PER_PAGE,
      },
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}

