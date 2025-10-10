export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF5F7]">
      <div className="text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#D4A373] border-r-transparent"></div>
        <p className="mt-4 text-[#3E3E3E] font-serif">Carregando convite...</p>
      </div>
    </div>
  )
}
