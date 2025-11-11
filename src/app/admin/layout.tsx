import { redirect } from "next/navigation"
import { auth } from "@/src/lib/auth"
import { AdminNavbar } from "@/src/components/admin-navbar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-[#FAF3E0]">
      <AdminNavbar />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}

