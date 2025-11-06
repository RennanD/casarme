import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CasarMe | Abrindo seu convite 💍",
  description: "Aguarde um instante — estamos abrindo seu convite de casamento.",
}

export default function OpenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

