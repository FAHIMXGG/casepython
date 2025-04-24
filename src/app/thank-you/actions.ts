"use server";
//2259
import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";

export const getPaymentStatus = async ({orderId}: {orderId: string}) => {
    const user = await currentUser()

    if(!user?.id || !user.primaryEmailAddress?.emailAddress) {
        throw new Error('User not authenticated')
    }

    const order = await db.order.findFirst({
        where: {id: orderId, userId: user.id},
        include: {
            shippingAddress: true,
            billingAddress: true,
            configuration: true,
            user: true,
        }
    })

    if(!order) {
        throw new Error('Order not found')
    }

    if(order.isPaid) {
       return order
    }  else {
        return false
    } 
}