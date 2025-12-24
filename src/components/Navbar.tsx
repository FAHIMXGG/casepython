"use client";

import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  const { user } = useUser();
  //console.log(user?.primaryEmailAddress?.emailAddress);
  const isAdmin =
    user?.primaryEmailAddress?.emailAddress ===
    process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-border bg-background/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-border">
          <Link href="/" className="flex z-40 font-semibold">
            case <span className="text-primary">python</span>
          </Link>

          <div className="h-full flex items-center space-x-4">
            {/* {user && <h1>{user?.primaryEmailAddress?.emailAddress}</h1>} */}
            {isAdmin && (
              <Link
                href="/admin"
                className={buttonVariants({ size: "sm", variant: "ghost" })}
              >
                Admin 🛠️
              </Link>
            )}
            { user && <Link
              href="/dashboard"
              className={buttonVariants({ size: "sm", variant: "ghost" })}
            >
              Dashboard ✨
            </Link>}

            <SignedIn>
              <UserButton />

              <Link
                href="/configure/upload"
                className={buttonVariants({
                  size: "sm",
                  className: "hidden sm:flex items-center gap-1",
                })}
              >
                Create case
                <ArrowRight className="ml-1.5 h-5 w-5" />
              </Link>
            </SignedIn>

            <SignedOut>
              <Link
                href="/sign-in"
                className={buttonVariants({ size: "sm", variant: "ghost" })}
              >
                Sign in
              </Link>

              <Link
                href="/sign-up"
                className={buttonVariants({ size: "sm", variant: "ghost" })}
              >
                Sign up
              </Link>

              <div className="h-8 w-px bg-border hidden sm:block" />

              <Link
                href="/configure/upload"
                className={buttonVariants({
                  size: "sm",
                  className: "hidden sm:flex items-center gap-1",
                })}
              >
                Create case
                <ArrowRight className="ml-1.5 h-5 w-5" />
              </Link>
            </SignedOut>

            <ThemeToggle />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
