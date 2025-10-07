export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A]">
      <div className="text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#D4AF37] border-r-transparent"></div>
        <p className="mt-4 text-white font-serif">Carregando convite...</p>
      </div>
    </div>
  )
}
