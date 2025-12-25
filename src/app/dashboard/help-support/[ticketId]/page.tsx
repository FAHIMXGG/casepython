import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import TicketViewClient from "./TicketViewClient";

const Page = async ({
  params,
}: {
  params: { ticketId: string };
}) => {
  const user = await currentUser();

  if (!user?.id) {
    return notFound();
  }

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

  // Prevent admins from accessing the dashboard
  if (user.primaryEmailAddress?.emailAddress === ADMIN_EMAIL) {
    return notFound();
  }

  return <TicketViewClient ticketId={params.ticketId} />;
};

export default Page;

