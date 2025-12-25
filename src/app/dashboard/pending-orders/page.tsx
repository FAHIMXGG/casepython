import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import PendingOrdersClient from "./PendingOrdersClient";

const Page = async () => {
  const user = await currentUser();

  if (!user?.id) {
    return notFound();
  }

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

  if (user.primaryEmailAddress?.emailAddress === ADMIN_EMAIL) {
    return notFound();
  }

  return <PendingOrdersClient />;
};

export default Page;

