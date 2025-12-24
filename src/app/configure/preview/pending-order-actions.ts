"use server"

import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { BASE_PRICE, PRODUCT_PRICE } from "@/config/products"

export async function savePendingOrder(configId: string) {
  try {
    const user = await currentUser()

    if (!user) {
      return { success: false, error: "User not authenticated" }
    }

    const configuration = await db.configuration.findUnique({
      where: { id: configId },
    })

    if (!configuration) {
      return { success: false, error: "Configuration not found" }
    }

    // Ensure user exists in DB
    let existingDbUser = await db.user.findUnique({
      where: { id: user.id },
    })

    if (!existingDbUser) {
      existingDbUser = await db.user.create({
        data: {
          id: user.id,
          email: user.emailAddresses[0]?.emailAddress || "",
        },
      })
    }

    // Calculate price
    const { material, finish } = configuration
    let price = BASE_PRICE
    if (finish === "textured") price += PRODUCT_PRICE.finish.textured
    if (material === "polycarbonate")
      price += PRODUCT_PRICE.material.polycarbonate

    // Check if there's already a pending order for this configuration
    const existingOrder = await db.order.findFirst({
      where: {
        userId: user.id,
        configurationId: configId,
        isPaid: false,
      },
    })

    if (existingOrder) {
      // Update existing pending order with latest price
      await db.order.update({
        where: { id: existingOrder.id },
        data: {
          amount: price / 100,
          updatedAt: new Date(),
        },
      })
      return { success: true, orderId: existingOrder.id }
    }

    // Create new pending order
    const order = await db.order.create({
      data: {
        amount: price / 100,
        userId: user.id,
        configurationId: configId,
        isPaid: false,
      },
    })

    return { success: true, orderId: order.id }
  } catch (error) {
    console.error("Error saving pending order:", error)
    return { success: false, error: "Failed to save pending order" }
  }
}

