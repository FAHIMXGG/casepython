"use server"

import { BASE_PRICE, PRODUCT_PRICE } from "@/config/products"
import { db } from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export const createCheckoutSession = async ({configId,}: {configId: string}) =>{
    const configuration = await db.configuration.findUnique({
        where: {id: configId}
    })  

    if(!configuration) {
        throw new Error("Configuration not found")
    }

    const {getUser} = getKindeServerSession()
    const user = await getUser()
    if(!user) {
        throw new Error("User not authenticated")
    }

    const {material, finish} = configuration
    let price = BASE_PRICE
    if (finish === 'textured') price += PRODUCT_PRICE.finish.textured
    if (material === 'polycarbonate') price += PRODUCT_PRICE.material.polycarbonate

    
}