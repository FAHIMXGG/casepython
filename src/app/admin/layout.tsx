import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Sidebar } from "@/components/Sidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL

  if (!user) {
    redirect('/sign-in?redirect=/admin')
  }

  if (user.primaryEmailAddress?.emailAddress !== ADMIN_EMAIL) {
    redirect('/sign-in?redirect=/admin')
  }

  return (
    <div className="flex min-h-screen w-full bg-muted/40 justify-center">
      <div className="flex w-full max-w-[1600px]">
        <Sidebar
          isAdmin={true}
          userEmail={user.primaryEmailAddress?.emailAddress}
          userName={user.firstName || user.username || undefined}
        />
        <main className="flex-1 overflow-auto lg:ml-0 transition-all duration-300 px-4 py-4 lg:px-0 lg:py-0">
          {children}
        </main>
      </div>
    </div>
  )
}
