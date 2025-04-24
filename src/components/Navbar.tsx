"use client";

import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

const Navbar = () => {
  const { user } = useUser();
  //console.log(user?.primaryEmailAddress?.emailAddress);
  const isAdmin =
    user?.primaryEmailAddress?.emailAddress ===
    process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            case <span className="text-[#E4335A]">cobra</span>
          </Link>

          <div className="h-full flex items-center space-x-4">
            {user && <h1>{user.username}</h1>}

            <SignedIn>
              <UserButton />
              {isAdmin && (
                <Link
                  href="/dashboard"
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Dashboard ✨
                </Link>
              )}

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
              <SignInButton mode="modal">
                <button
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Sign in
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Sign up
                </button>
              </SignUpButton>

              <div className="h-8 w-px bg-zinc-200 hidden sm:block" />

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
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
