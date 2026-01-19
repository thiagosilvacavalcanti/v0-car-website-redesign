"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Gauge,
  Fuel,
  Info,
  ChevronLeft,
  ChevronRight,
  Phone,
} from "lucide-react"

interface Vehicle {
  id: string
  brand: string
  model: string
  year: number
  price: number
  mileage: number
  fuel_type: string
  transmission: string
  color: string
  description: string
  features: string[]
  image_url: string
  images: string[]
}

interface VehicleDetailsModalProps {
  vehicle: Vehicle | null
  isOpen: boolean
  onClose: () => void
}

export function VehicleDetailsModal({
  vehicle,
  isOpen,
  onClose,
}: VehicleDetailsModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!vehicle) return null

  const allImages = [vehicle.image_url, ...(vehicle.images || [])].filter(Boolean)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  const handleWhatsApp = () => {
    const phoneNumber = "5511958042257"
    const message = `Olá, tenho interesse no veículo ${vehicle.brand} ${vehicle.model} ${vehicle.year}.`
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto p-0 border-none bg-black text-white sm:rounded-xl">
        <div className="flex flex-col">
          {/* Carousel Section */}
          <div className="relative w-full aspect-video md:aspect-[16/9] lg:aspect-[21/9] bg-zinc-900 overflow-hidden">
            {allImages.length > 0 ? (
              <>
                <Image
                  src={allImages[currentImageIndex]}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  fill
                  className="object-cover"
                  priority
                />
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1.5 sm:p-2 rounded-full transition-colors z-10"
                    >
                      <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1.5 sm:p-2 rounded-full transition-colors z-10"
                    >
                      <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                      {allImages.map((_, index) => (
                        <div
                          key={index}
                          className={`h-1.5 w-1.5 rounded-full transition-all ${
                            index === currentImageIndex ? "bg-primary w-4" : "bg-white/30"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Sem imagens disponíveis
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="p-5 sm:p-8 space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-[#ffcc00] text-black hover:bg-[#ffcc00]/90 font-bold">
                    ESTOQUE
                  </Badge>
                  {vehicle.year >= 2024 && (
                    <Badge variant="outline" className="border-white text-white">
                      NOVO
                    </Badge>
                  )}
                </div>
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter">
                  {vehicle.brand} {vehicle.model}
                </h2>
                <div className="flex items-center gap-4 text-zinc-400 font-medium">
                  <span>{vehicle.year}</span>
                  <span className="h-1 w-1 bg-zinc-700 rounded-full" />
                  <span>{vehicle.mileage.toLocaleString("pt-BR")} KM</span>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-4xl sm:text-5xl font-black text-[#ffcc00] tracking-tighter">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(vehicle.price)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 sm:p-6 bg-zinc-900/50 rounded-2xl border border-white/5">
              <div className="flex flex-col items-center text-center gap-1">
                <Calendar className="h-5 w-5 text-[#ffcc00] mb-1" />
                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Ano</span>
                <span className="text-sm font-bold">{vehicle.year}</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <Gauge className="h-5 w-5 text-[#ffcc00] mb-1" />
                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Quilometragem</span>
                <span className="text-sm font-bold">{vehicle.mileage.toLocaleString("pt-BR")}</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <Fuel className="h-5 w-5 text-[#ffcc00] mb-1" />
                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Combustível</span>
                <span className="text-sm font-bold">{vehicle.fuel_type}</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <Info className="h-5 w-5 text-[#ffcc00] mb-1" />
                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Câmbio</span>
                <span className="text-sm font-bold">{vehicle.transmission || "N/A"}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Descrição</h4>
                <p className="text-sm text-zinc-300 leading-relaxed font-medium">
                  {vehicle.description || "Veículo em excelente estado de conservação, revisado e com garantia SML Veículos."}
                </p>
              </div>

              {vehicle.features && vehicle.features.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Opcionais e Itens</h4>
                  <div className="flex flex-wrap gap-2">
                    {vehicle.features.map((feature, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border-none px-3 py-1 text-[11px] font-bold"
                      >
                        {feature.toUpperCase()}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4">
              <Button
                onClick={handleWhatsApp}
                className="w-full bg-[#ffcc00] text-black hover:bg-[#ffcc00]/90 text-lg font-black h-16 rounded-2xl shadow-[0_0_20px_rgba(255,204,0,0.15)] transition-all hover:scale-[1.01]"
              >
                <Phone className="h-6 w-6 mr-3 fill-current" />
                NEGOCIAR AGORA
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
