import { db } from '@/db';
import React from 'react';

const Page = async () => {
    const orders = await db.order.findMany({
        where: {
          isPaid: true,
          createdAt: {
            gte: new Date(new Date().setDate(new Date().getDate() - 7)),
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: true,
          shippingAddress: true,
        },
      });
    return (
        <div>
            
        </div>
    );
};

export default Page;