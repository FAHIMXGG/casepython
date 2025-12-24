import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import CustomersClient from "./CustomersClient";

const Page = async () => {
  const user = await currentUser();
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

  if (!user || user.primaryEmailAddress?.emailAddress !== ADMIN_EMAIL) {
    return notFound();
  }

  return <CustomersClient />;
};

export default Page;

