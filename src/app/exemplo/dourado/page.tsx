import { Button } from "@/components/ui/button";
import { GoldenTemplate } from "@/src/components/templates/golden-template/golden-template";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="max-w-lg mx-auto">
      <header className="max-w-lg fixed z-50 w-full mx-auto p-5 flex items-center justify-between bg-accent border-b border-border">
        <Link href="/" className="text-lg font-semibold text-[#D4A373] flex items-center gap-2">
          <ArrowLeft />
          Casarme
        </Link>

        <Button asChild className="bg-[#D4A373] hover:bg-[#C49363] text-white text-sm px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus-visible:focus-visible">
          <Link href="/modelos/dourado">Criar Convite</Link>
        </Button>
      </header>
      <div className="pt-20">
        <GoldenTemplate
          brideName="Bárbara"
          groomName="Rennan"
          date="2026-02-12T12:00:00-03:00"
          address="Rua dos Bobos, 0"
          musicUrl="https://www.youtube.com/watch?v=OPugs48z2GU&list=RDOPugs48z2GU&start_radio=1"
          whatsappNumber="123456789"
        />
      </div>
    </div>
  )
}