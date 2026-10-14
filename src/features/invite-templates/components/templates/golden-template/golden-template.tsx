interface GoldenTemplateProps {
  brideName: string
  groomName: string
  date: string
  musicUrl?: string
  address: string
  whatsappNumber: string
}

import Image from "next/image"
import pattern from "@/src/assets/images/golden-pattern.png"
import { MapPin, MessageCircle } from "lucide-react"
import { PlayButton } from "./play-button"

export function GoldenTemplate({
  brideName,
  groomName,
  date,
  address,
  musicUrl,
  whatsappNumber,
}: GoldenTemplateProps) {

  const brideFirstLetter = brideName.charAt(0)
  const groomFirstLetter = groomName.charAt(0)

  const weekDay = new Date(date).toLocaleDateString("pt-BR", { weekday: "long" })
  const day = new Date(date).toLocaleDateString("pt-BR", { day: "2-digit" })
  const month = new Date(date).toLocaleDateString("pt-BR", { month: "long" })
  const year = new Date(date).toLocaleDateString("pt-BR", { year: "numeric" })
  const time = new Date(date).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })

  const message = `Olá! Será uma honra estar presente nessa data tão especial! 💕`

  return (
    <section className="bg-[#FFFDFA]">

      {/* <header className="max-w-xl fixed w-full mx-auto p-5 flex items-center justify-between bg-accent border-b border-border">
        <Link href="/" className="text-xl font-semibold">Casarme</Link>

        <Button asChild className="bg-[#D4A373] hover:bg-[#C49363] text-white text-sm px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus-visible:focus-visible">
          <Link href="/modelos/dourado">Criar Convite</Link>
        </Button>
      </header> */}

      <div className="relative text-center min-h-screen max-w-lg mx-auto flex flex-col items-center py-16 px-5">
        <Image src={pattern} alt="Pattern" className="absolute top-20 left-0 object-cover" />

        <span className="text-xl font-semibold">Você está convidado para o nosso casamento</span>

        <h1 className="font-script text-9xl text-[#947644] mt-20">{brideFirstLetter}{groomFirstLetter}</h1>
        <p className="text-2xl">{brideName} & {groomName}</p>

        <div className="flex items-center gap-4 mt-12">
          <div className="flex flex-col items-center py-4 border-y border-[#947644]">
            <p className="uppercase font-semibold text-[#947644]">{weekDay}</p>
          </div>
          <div className="flex flex-col items-center px-4 border-x border-[#947644]">
            <p className="uppercase text-sm font-semibold text-[#947644]">{month}</p>
            <p className="uppercase font-semibold text-7xl text-[#947644]">{day}</p>
            <p className="uppercase text-sm font-semibold text-[#947644]">{year}</p>
          </div>
          <div className="flex flex-col items-center py-4 border-y border-[#947644]">
            <p className="uppercase font-semibold text-[#947644]">{time} Horas</p>
          </div>
        </div>

        <div className="mt-16">
          <p className="text-2xl">{address}</p>
        </div>

        <div className="mt-10 flex items-center gap-10">
          <div className="flex flex-col items-center gap-2">
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" className="bg-[#947644] flex items-center justify-center text-white h-12 w-12 rounded-full">
              <MapPin />
            </a>
            <p className="text-xl uppercase font-medium">Como <br /> chegar</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" className="bg-[#947644] flex items-center justify-center text-white h-12 w-12 rounded-full">
              <MessageCircle />
            </a>
            <p className="text-xl uppercase font-medium">Confirmar <br /> presença</p>
          </div>

          {musicUrl && (
            <div className="flex flex-col items-center gap-2">
              <PlayButton musicUrl={musicUrl} />
              <p className="text-xl uppercase font-medium">Clique <br /> aqui</p>
            </div>
          )}
        </div>

        <p className="mt-10 text-xl">Seremos gratos em ter sua presença!</p>
      </div>
    </section>

  )
}