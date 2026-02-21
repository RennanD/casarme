interface BlueTemplateProps {
  brideName: string
  groomName: string
  thumbnail: string
  date: string
  musicUrl?: string
  address: string
  whatsappNumber: string
}

import Image from "next/image"
import { MapPin, MessageCircle } from "lucide-react"
import { PlayButton } from "./play-button"

import leftFlowerImage from '@/src/assets/images/blue-template/left-flower.png'
import rightFlowerImage from '@/src/assets/images/blue-template/right-flower.png'

export function BlueTemplate({
  brideName,
  groomName,
  date,
  address,
  thumbnail,
  musicUrl,
  whatsappNumber,
}: BlueTemplateProps) {

  const brideFirstLetter = brideName.charAt(0)
  const groomFirstLetter = groomName.charAt(0)

  const weekDay = new Date(date).toLocaleDateString("pt-BR", { weekday: "long" })
  const day = new Date(date).toLocaleDateString("pt-BR", { day: "2-digit" })
  const month = new Date(date).toLocaleDateString("pt-BR", { month: "long" })
  const year = new Date(date).toLocaleDateString("pt-BR", { year: "numeric" })
  const time = new Date(date).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })

  const message = `Olá! Será uma honra estar presente nessa data tão especial! 💕`

  return (
    <section className="bg-[#FFFDFA] overflow-hidden">
      <div className="relative text-center min-h-screen max-w-lg mx-auto flex flex-col items-center py-16 px-5">
        <div className="absolute  inset-0 bg-linear-to-b  via-45% from-white">
          <div className="w-full h-full relative">
            <div className="w-full h-[300px] relative">

              <Image src={thumbnail} alt="Thumbnail" fill className="object-cover object-top" />
              <div className="absolute bottom-0 h-32 w-full bg-linear-to-b via-10% from-white/0 to-white" />
            </div>
          </div>
        </div>


        <div className="relative z-20 mt-32 flex flex-col items-center ">

          <Image src={leftFlowerImage} alt="Left Flower" width={100} height={100} className="absolute top-1/2 -translate-y-1/2 -left-10" />
          <Image src={rightFlowerImage} alt="Right Flower" width={100} height={100} className="absolute top-1/2 -translate-y-1/2 -right-10" />

          <h1 className="font-script text-8xl text-[#08265E] ">
            <span>{brideName} e {groomName}</span>
          </h1>


          <p className="max-w-[250px]">Carinhosamente convidam para a cerimônia de seu casamento</p>


          <div className="flex flex-col gap-2 mt-12">

            <p className="uppercase font-semibold text-sm text-[#08265E]">{day} de <span className="uppercase">{month}</span> de {year}</p>


            <div className="w-full h-px bg-[#08265E]"></div>

            <p className="uppercase max-w-[250px] font-semibold text-sm text-[#08265E]">{time} Horas no <span className="uppercase">{address}</span></p>

          </div>

          <div className="mt-10 flex items-center gap-10">
            <div className="flex flex-col items-center gap-2">
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" className="bg-[#08265E] flex items-center justify-center text-white h-12 w-12 rounded-full">
                <MapPin />
              </a>
              <p className="text-lg uppercase font-medium">Como <br /> chegar</p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" className="bg-[#08265E] flex items-center justify-center text-white h-12 w-12 rounded-full">
                <MessageCircle />
              </a>
              <p className="text-lg uppercase font-medium">Confirmar <br /> presença</p>
            </div>

            {musicUrl && (
              <div className="flex flex-col items-center gap-2">
                <PlayButton musicUrl={musicUrl} />
                <p className="text-lg uppercase font-medium">Clique <br /> aqui</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>

  )
}