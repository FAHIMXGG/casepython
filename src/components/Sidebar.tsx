"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import {
  LayoutDashboard,
  Package,
  History,
  ShoppingCart,
  Users,
  Ticket,
  ChevronLeft,
  ChevronRight,
  User,
  Grid3x3,
  Menu,
  HelpCircle,
  MessageSquare,
} from "lucide-react"
import { Button } from "./ui/button"

interface SidebarProps {
  isAdmin: boolean
  userEmail?: string
  userName?: string
  notificationCount?: number
}

const adminNavItems = [
  {
    title: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
    description: "Dashboard overview",
  },
  {
    title: "Manage Orders",
    href: "/admin/orders",
    icon: Package,
    description: "View and manage all orders",
  },
  {
    title: "Coupon Management",
    href: "/admin/coupons",
    icon: Ticket,
    description: "Create and manage discount coupons",
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
    description: "View customer information",
  },
  {
    title: "Support Messages",
    href: "/admin/support",
    icon: MessageSquare,
    description: "View and respond to support tickets",
  },
]

const userNavItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Dashboard overview",
  },
  {
    title: "Pending Orders",
    href: "/dashboard/pending-orders",
    icon: ShoppingCart,
    description: "Complete your pending orders",
  },
  {
    title: "Manage Order",
    href: "/dashboard/manage-order",
    icon: Package,
    description: "Manage your active orders",
  },
  {
    title: "Order History",
    href: "/dashboard/order-history",
    icon: History,
    description: "View all your past orders",
  },
  {
    title: "Help & Support",
    href: "/dashboard/help-support",
    icon: HelpCircle,
    description: "Get help and support",
    showNotification: true,
  },
]

export function Sidebar({ isAdmin, userEmail, userName, notificationCount = 0 }: SidebarProps) {
  const pathname = usePathname()
  const navItems = isAdmin ? adminNavItems : userNavItems
  const [isOpen, setIsOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [unreadCount, setUnreadCount] = useState(notificationCount)

  // Fetch notification count for help & support
  useEffect(() => {
    if (!isAdmin) {
      fetch('/api/support/notifications')
        .then(res => res.json())
        .then(data => {
          if (data.count !== undefined) {
            setUnreadCount(data.count)
          }
        })
        .catch(() => {})
    }
  }, [isAdmin, pathname])

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (mobile) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }
    
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const sidebarWidth = isOpen ? "w-64" : "w-0 lg:w-20"
  const sidebarTranslate = isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
  const showContent = isOpen && !isMobile

  return (
    <>
      {/* Mobile Overlay - Black background when sidebar is open */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/80 z-40 lg:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Toggle Button - Desktop */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "fixed top-4 z-50 hidden lg:flex transition-all duration-300",
          isOpen ? "left-[15.5rem]" : "left-20",
          "bg-card border border-border shadow-sm hover:bg-accent rounded-full"
        )}
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen z-50 flex flex-col border-r border-border bg-card transition-all duration-300 ease-in-out",
          sidebarWidth,
          sidebarTranslate,
          "overflow-hidden"
        )}
      >
        {/* Close Button on Right Edge of Sidebar - Mobile when open */}
        {isOpen && isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-[60] lg:hidden",
              "bg-background border border-border shadow-xl",
              "rounded-full h-12 w-12",
              "hover:bg-accent transition-all duration-300",
              "flex items-center justify-center"
            )}
            onClick={toggleSidebar}
            aria-label="Close menu"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </Button>
        )}
        {/* Header Section */}
        <div className={cn(
          "flex flex-col border-b border-border transition-all duration-300",
          isOpen || isMobile ? "px-6 py-6" : "px-4 py-4"
        )}>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0">
              <Grid3x3 className={cn(
                "text-foreground transition-all",
                isOpen || isMobile ? "h-6 w-6" : "h-7 w-7"
              )} />
            </div>
            {(isOpen || isMobile) && (
              <div className="flex flex-col min-w-0">
                <h2 className="text-xl font-bold text-foreground leading-tight">
                  {isAdmin ? "Admin" : "Dashboard"}
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {isAdmin ? "Admin workspace" : "Personal workspace"}
                </p>
              </div>
            )}
          </div>
          
          {(isOpen || isMobile) && (
            <>
              <div className="h-px bg-border mb-4" />
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50">
                <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground truncate">
                    Signed in as {userName || userEmail?.split("@")[0] || "USER"}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Navigation */}
        <nav className={cn(
          "flex-1 overflow-y-auto space-y-1 transition-all duration-300",
          isOpen || isMobile ? "px-4 py-4" : "px-2 py-2"
        )}>
          {navItems.map((item) => {
            const Icon = item.icon
            // Fix active state: exact match for base routes, or starts with href + "/" for sub-routes
            // Overview should only be active on exact match, not on sub-routes
            const isBaseRoute = item.href === "/admin" || item.href === "/dashboard"
            const isActive = isBaseRoute
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(item.href + "/")

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => isMobile && setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                  isOpen || isMobile
                    ? "px-3 py-3"
                    : "justify-center px-2 py-3 w-full",
                  // Active state - different for collapsed vs expanded
                  isActive && (isOpen || isMobile)
                    ? "bg-primary/10 text-foreground"
                    : isActive && !isOpen && !isMobile
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
                title={!isOpen && !isMobile ? item.title : undefined}
              >
                {/* Active Indicator - only show when expanded */}
                {isActive && (isOpen || isMobile) && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                )}
                
                <Icon
                  className={cn(
                    "flex-shrink-0 transition-colors",
                    isOpen || isMobile ? "h-5 w-5 mt-0.5" : "h-6 w-6",
                    isActive && (isOpen || isMobile)
                      ? "text-primary"
                      : isActive && !isOpen && !isMobile
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-foreground"
                  )}
                />
                
                {(isOpen || isMobile) && (
                  <div className="flex-1 min-w-0">
                    <div className="font-medium flex items-center gap-2">
                      {item.title}
                      {!isAdmin && item.showNotification && unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
                          {unreadCount > 99 ? '99+' : unreadCount}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {item.description}
                    </div>
                  </div>
                )}
                {!isOpen && !isMobile && !isAdmin && item.showNotification && unreadCount > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center min-w-[16px] text-[10px]">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Mobile Toggle Button - Left side, middle of screen - Dark tall narrow button with rounded right corners */}
      {mounted && !isOpen && isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "fixed left-0 top-1/2 -translate-y-1/2 z-[60] lg:hidden",
            "bg-card/95 backdrop-blur-sm border-r border-border shadow-xl",
            "rounded-r-lg rounded-l-none h-14 w-10",
            "hover:bg-card transition-all duration-300",
            "flex items-center justify-center"
          )}
          onClick={toggleSidebar}
          aria-label="Open menu"
        >
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Button>
      )}
    </>
  )
}
