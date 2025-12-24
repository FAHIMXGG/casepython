"use server"

import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

const ADMIN_EMAIL = process.env.ADMIN_EMAIL

async function checkAdmin() {
  const user = await currentUser()
  if (!user || user.primaryEmailAddress?.emailAddress !== ADMIN_EMAIL) {
    throw new Error("Unauthorized")
  }
  return user
}

export async function createCoupon(data: {
  code: string
  discount: number
  description?: string
  validUntil?: Date
  maxUses?: number
  minAmount?: number
}) {
  await checkAdmin()

  // Check if coupon code already exists
  const existing = await db.coupon.findUnique({
    where: { code: data.code.toUpperCase() },
  })

  if (existing) {
    throw new Error("Coupon code already exists")
  }

  const coupon = await db.coupon.create({
    data: {
      code: data.code.toUpperCase(),
      discount: data.discount,
      description: data.description,
      validUntil: data.validUntil,
      maxUses: data.maxUses,
      minAmount: data.minAmount,
    },
  })

  revalidatePath("/admin/coupons")
  return coupon
}

export async function updateCoupon(
  id: string,
  data: {
    code?: string
    discount?: number
    description?: string
    isActive?: boolean
    validUntil?: Date | null
    maxUses?: number | null
    minAmount?: number | null
  }
) {
  await checkAdmin()

  const updateData: any = { ...data }
  if (updateData.code) {
    updateData.code = updateData.code.toUpperCase()
    // Check if new code conflicts with existing coupon
    const existing = await db.coupon.findFirst({
      where: {
        code: updateData.code,
        NOT: { id },
      },
    })
    if (existing) {
      throw new Error("Coupon code already exists")
    }
  }

  const coupon = await db.coupon.update({
    where: { id },
    data: updateData,
  })

  revalidatePath("/admin/coupons")
  return coupon
}

export async function deleteCoupon(id: string) {
  await checkAdmin()

  await db.coupon.delete({
    where: { id },
  })

  revalidatePath("/admin/coupons")
}

export async function getCoupons() {
  await checkAdmin()

  try {
    // Check if coupon model exists in Prisma client
    if (!db.coupon) {
      console.error("Coupon model not found. Please run: npx prisma generate")
      return []
    }
    
    return await db.coupon.findMany({
      orderBy: { createdAt: "desc" },
    })
  } catch (error: any) {
    console.error("Error fetching coupons:", error)
    // If table doesn't exist yet, return empty array
    if (error.message?.includes("does not exist") || error.message?.includes("Unknown model")) {
      return []
    }
    throw error
  }
}

