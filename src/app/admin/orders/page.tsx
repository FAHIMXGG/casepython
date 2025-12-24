import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import OrdersClient from "./OrdersClient";

const Page = async () => {
  const user = await currentUser();
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

  if (!user || user.primaryEmailAddress?.emailAddress !== ADMIN_EMAIL) {
    return notFound();
  }

  return <OrdersClient />;
};

export default Page;

