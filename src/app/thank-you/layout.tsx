import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = constructMetadata({
  title: "Thank You for Your Order | CasePython",
  description: "Thank you for your order! Your custom phone case is being processed. You'll receive a confirmation email shortly.",
  image: "/thumbnail.png",
});

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

