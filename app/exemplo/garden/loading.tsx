export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5DC]">
      <div className="text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#8B9D7F] border-r-transparent"></div>
        <p className="mt-4 text-[#3E3E3E] font-serif">Carregando convite...</p>
      </div>
    </div>
  )
}
