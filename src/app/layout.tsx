import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Recursive } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import Provider from "@/components/Provider";
import { constructMetadata } from "@/lib/utils";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = constructMetadata()

const recursive = Recursive({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={recursive.className}
      >
        <Navbar />
        <main className='flex bg-[#fcebee42] flex-col min-h-[calc(100vh-3.5rem-1px)]'>
          <div className="flex-1 flex flex-col h-full">
            <Provider>{children}</Provider>
          </div>
          <Footer />
        </main>

        <Toaster />

      </body>
    </html>
  );
}
