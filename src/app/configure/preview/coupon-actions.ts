"use server"

import { db } from "@/db"

export async function validateCoupon(code: string, orderAmount: number) {
  try {
    const coupon = await db.coupon.findUnique({
      where: { code: code.toUpperCase().trim() },
    })

    if (!coupon) {
      return { valid: false, error: "Invalid coupon code" }
    }

    if (!coupon.isActive) {
      return { valid: false, error: "This coupon is not active" }
    }

    // Check if coupon has expired
    if (coupon.validUntil && new Date(coupon.validUntil) < new Date()) {
      return { valid: false, error: "This coupon has expired" }
    }

    // Check if coupon has reached max uses
    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
      return { valid: false, error: "This coupon has reached its usage limit" }
    }

    // Check minimum order amount
    if (coupon.minAmount && orderAmount < coupon.minAmount) {
      return {
        valid: false,
        error: `Minimum order amount of ${orderAmount.toFixed(2)} required`,
      }
    }

    // Check if coupon is valid (not expired from validFrom)
    if (coupon.validFrom && new Date(coupon.validFrom) > new Date()) {
      return { valid: false, error: "This coupon is not yet valid" }
    }

    return {
      valid: true,
      coupon: {
        id: coupon.id,
        code: coupon.code,
        discount: coupon.discount,
        description: coupon.description,
      },
    }
  } catch (error) {
    return { valid: false, error: "Error validating coupon" }
  }
}

