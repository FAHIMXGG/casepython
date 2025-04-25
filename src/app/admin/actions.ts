"use server"

import { db } from '@/db'
import { OrderStatus } from '@prisma/client'
import { Resend } from 'resend'
import OrderStatusEmail from '@/components/emails/OrderStatusEmail'

const resend = new Resend(process.env.RESEND_API_KEY)

export const changeOrderStatus = async ({
  id,
  newStatus,
}: {
  id: string
  newStatus: OrderStatus
}) => {
  const updatedOrder = await db.order.update({
    where: { id },
    data: { status: newStatus },
    include: {
      user: true,
    },
  })

  // Send email notification
  if (updatedOrder.user.email) {
    await resend.emails.send({
      from: "CasePython <support@kraito.com>",
      to: [updatedOrder.user.email],
      subject: "Order Status Update",
      react: OrderStatusEmail({
        orderId: id,
        orderStatus: newStatus,
      }),
    })
  }

  return updatedOrder
}