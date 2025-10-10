import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-12 bg-[#FAF3E0]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          <h3 className="font-serif text-3xl font-bold text-[#D4A373]">CasarMe</h3>
          <nav className="flex flex-wrap justify-center gap-6">
            <Link href="#" className="text-[#6B6B6B] hover:text-[#D4A373] transition-colors">
              Termos de Uso
            </Link>
            <Link href="#" className="text-[#6B6B6B] hover:text-[#D4A373] transition-colors">
              Política de Privacidade
            </Link>
            <Link href="#" className="text-[#6B6B6B] hover:text-[#D4A373] transition-colors">
              Contato
            </Link>
          </nav>
          {/* Updated copyright text to reflect new brand name */}
          <p className="text-[#6B6B6B] text-sm text-center">© 2025 CasarMe. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
