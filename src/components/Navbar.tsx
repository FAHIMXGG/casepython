"use client";

import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";
import { ArrowRight, Menu, X } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";

const Navbar = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  //console.log(user?.primaryEmailAddress?.emailAddress);
  const isAdmin =
    user?.primaryEmailAddress?.emailAddress ===
    process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const allNavLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
    { href: "/dashboard", label: "Dashboard", requireAuth: true },
    { href: "/admin", label: "Admin", requireAdmin: true },
    { href: "/sign-in", label: "Sign in", requireGuest: true },
    { href: "/sign-up", label: "Sign up", requireGuest: true },
  ];

  // Filter nav links based on authentication state
  const navLinks = allNavLinks.filter((link) => {
    if (link.requireAuth && !user) return false;
    if (link.requireAdmin && !isAdmin) return false;
    if (link.requireGuest && user) return false;
    // Hide Dashboard for admin users
    if (link.href === "/dashboard" && isAdmin) return false;
    return true;
  }).map((link) => ({
    ...link,
    // Rename "Admin" to "Dashboard" for admin users
    label: link.href === "/admin" ? "Dashboard" : link.label,
  }));

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-border bg-background/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-border">
          <Link href="/" className="flex z-40 font-semibold">
            case <span className="text-primary">python</span>
          </Link>

          <div className="h-full flex items-center space-x-4">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={buttonVariants({
                      size: "sm",
                      variant: isActive ? "secondary" : "ghost",
                    })}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <SignedIn>
              <UserButton />

              {!isAdmin && (
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
              )}
            </SignedIn>

            <SignedOut>
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-accent"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="flex flex-col py-4 space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={buttonVariants({
                      size: "sm",
                      variant: isActive ? "secondary" : "ghost",
                      className: "w-full justify-start",
                    })}
                  >
                    {link.label}
                  </Link>
                );
              })}
              
              <SignedIn>
                {!isAdmin && (
                  <Link
                    href="/configure/upload"
                    onClick={() => setMobileMenuOpen(false)}
                    className={buttonVariants({
                      size: "sm",
                      className: "w-full justify-start items-center gap-1",
                    })}
                  >
                    Create case
                    <ArrowRight className="ml-1.5 h-5 w-5" />
                  </Link>
                )}
              </SignedIn>

              <SignedOut>
                <Link
                  href="/configure/upload"
                  onClick={() => setMobileMenuOpen(false)}
                  className={buttonVariants({
                    size: "sm",
                    className: "w-full justify-start items-center gap-1",
                  })}
                >
                  Create case
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </SignedOut>
            </div>
          </div>
        )}
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
