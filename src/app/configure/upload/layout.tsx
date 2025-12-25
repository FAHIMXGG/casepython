import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = constructMetadata({
  title: "Upload Your Image - Create Custom Phone Case | CasePython",
  description: "Upload your favorite image to create a custom phone case. Support for PNG, JPG, and JPEG formats. Start designing your unique case today.",
  image: "/thumbnail.png",
});

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

