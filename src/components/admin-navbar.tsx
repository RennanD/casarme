"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { Button } from "@/src/components/ui/button"
import { Heart, LogOut } from "lucide-react"

export function AdminNavbar() {
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" })
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/admin" className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-[#D4A373] fill-current" />
            <span className="font-serif text-2xl text-[#3E3E3E]" style={{ fontFamily: "Playfair Display" }}>
              CasarMe
            </span>
            <span className="text-sm text-[#6B6B6B] ml-2">Admin</span>
          </Link>

          {/* Botão Sair */}
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </div>
    </nav>
  )
}

