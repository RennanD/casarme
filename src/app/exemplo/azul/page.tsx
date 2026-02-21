import { Button } from "@/components/ui/button";
import { BlueTemplate } from "@/src/components/templates/blue-template";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BlueTemplateDialog } from "@/src/components/blue-template-dialog";

export default function Page() {
  return (
    <div className="max-w-lg mx-auto">
      <header className="max-w-lg fixed z-50 w-full mx-auto p-5 flex items-center justify-between bg-accent border-b border-border">
        <Link href="/" className="text-lg font-semibold text-[#D4A373] flex items-center gap-2">
          <ArrowLeft />
          Casarme
        </Link>

        <BlueTemplateDialog>
          <Button className="bg-[#08265E] hover:bg-[#061B44] text-white text-sm px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus-visible:focus-visible">
            Criar Convite
          </Button>
        </BlueTemplateDialog>
      </header>
      <div className="pt-20">
        <BlueTemplate
          brideName="Marina"
          groomName="Fernando"
          date="2026-02-12T12:00:00-03:00"
          address="Rua dos Bobos, 0"
          thumbnail="https://www.guiadecasamento.com.br/blog/wp-content/uploads/2014/01/noivos-roupa-festa-casamento.jpg"
          musicUrl="https://www.youtube.com/watch?v=OPugs48z2GU&list=RDOPugs48z2GU&start_radio=1"
          whatsappNumber="123456789"
        />
      </div>
    </div>
  )
}