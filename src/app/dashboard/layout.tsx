import { currentUser } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"
import { Sidebar } from "@/components/Sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()

  if (!user?.id) {
    return notFound()
  }

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL

  // Prevent admins from accessing the dashboard
  if (user.primaryEmailAddress?.emailAddress === ADMIN_EMAIL) {
    return notFound()
  }

  return (
    <div className="flex min-h-screen w-full bg-muted/40 justify-center">
      <div className="flex w-full max-w-[1600px]">
        <Sidebar
          isAdmin={false}
          userEmail={user.primaryEmailAddress?.emailAddress}
          userName={user.firstName || user.username || undefined}
        />
        <main className="flex-1 overflow-auto lg:ml-0 transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  )
}
