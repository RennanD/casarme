import Link from 'next/link'
import { Button } from '@/src/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF3E0] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#3E3E3E] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[#6B6B6B] mb-6">
          Página não encontrada
        </h2>
        <p className="text-[#6B6B6B] mb-8 max-w-md">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Button asChild className="bg-[#D4A373] text-white hover:bg-[#C49363]">
          <Link href="/">
            Voltar para home
          </Link>
        </Button>
      </div>
    </div>
  )
}
