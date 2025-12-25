import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import HelpSupportClient from "./HelpSupportClient";

const Page = async () => {
  const user = await currentUser();

  if (!user?.id) {
    return notFound();
  }

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

  // Prevent admins from accessing the dashboard
  if (user.primaryEmailAddress?.emailAddress === ADMIN_EMAIL) {
    return notFound();
  }

  return <HelpSupportClient />;
};

export default Page;

