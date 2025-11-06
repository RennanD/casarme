export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF3E0]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#D4A373] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[#6B6B6B]">Carregando...</p>
      </div>
    </div>
  )
}

