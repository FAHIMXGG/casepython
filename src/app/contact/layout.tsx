import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = constructMetadata({
  title: "Contact CasePython - Get in Touch | Customer Support",
  description: "Contact CasePython for questions about custom phone cases, orders, warranty claims, or support. We're here to help! Response within 24 hours.",
  image: "/thumbnail.png",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

