import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-12 bg-[#FAF3E0]" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          <h3 className="font-serif text-3xl font-bold text-[#D4A373]">CasarMe</h3>
          <nav className="flex flex-wrap justify-center gap-6" role="navigation" aria-label="Links do rodapé">
            <Link href="/termos-de-uso" className="text-[#6B6B6B] hover:text-[#D4A373] transition-colors" aria-label="Termos de uso do CasarMe">
              Termos de Uso
            </Link>
            <Link href="/politica-de-privacidade" className="text-[#6B6B6B] hover:text-[#D4A373] transition-colors" aria-label="Política de privacidade do CasarMe">
              Política de Privacidade
            </Link>
            <a
              href="mailto:casarme.site@gmail.com"
              className="text-[#6B6B6B] hover:text-[#D4A373] transition-colors"
              aria-label="Enviar email para CasarMe"
            >
              Contato
            </a>
          </nav>
          <p className="text-[#6B6B6B] text-sm text-center">© 2025 CasarMe. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
