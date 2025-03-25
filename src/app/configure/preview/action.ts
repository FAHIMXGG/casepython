"use server";

import { BASE_PRICE, PRODUCT_PRICE } from "@/config/products";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Order } from "@prisma/client";

export const createCheckoutSession = async ({
  configId,
}: {
  configId: string;
}) => {
  const configuration = await db.configuration.findUnique({
    where: { id: configId },
  });

  if (!configuration) {
    throw new Error("Configuration not found");
  }

  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const { material, finish } = configuration;
  let price = BASE_PRICE;
  if (finish === "textured") price += PRODUCT_PRICE.finish.textured;
  if (material === "polycarbonate")
    price += PRODUCT_PRICE.material.polycarbonate;

  let order: Order | undefined = undefined;

  const existingOrder = await db.order.findFirst({
    where: {
      userId: user.id,
      configurationId: configuration.id,
    },
  });
  if (existingOrder) {
    order = existingOrder;
  } else {
    order = await db.order.create({
      data: {
        amount : price /100,
        userId: user.id,
        configurationId: configuration.id,
      },
    });
  }
  
};
