import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import AdminTicketViewClient from "./AdminTicketViewClient";

const Page = async ({
  params,
}: {
  params: { ticketId: string };
}) => {
  const user = await currentUser();
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

  if (!user || user.primaryEmailAddress?.emailAddress !== ADMIN_EMAIL) {
    return notFound();
  }

  return <AdminTicketViewClient ticketId={params.ticketId} />;
};

export default Page;

