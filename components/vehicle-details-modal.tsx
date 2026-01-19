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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 border-none bg-black text-white">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Carousel Section */}
          <div className="relative h-[300px] md:h-full min-h-[400px] bg-zinc-900">
            {allImages.length > 0 ? (
              <>
                <Image
                  src={allImages[currentImageIndex]}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  fill
                  className="object-cover"
                />
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {allImages.map((_, index) => (
                        <div
                          key={index}
                          className={`h-2 w-2 rounded-full ${
                            index === currentImageIndex ? "bg-primary" : "bg-white/50"
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
          <div className="p-6 md:p-8 space-y-6">
            <div>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-[#ffcc00] text-black hover:bg-[#ffcc00]/90">
                    Disponível
                  </Badge>
                  {vehicle.year >= 2023 && (
                    <Badge variant="outline" className="border-white text-white">
                      Novo
                    </Badge>
                  )}
                </div>
                <DialogTitle className="text-3xl font-bold">
                  {vehicle.brand} {vehicle.model}
                </DialogTitle>
              </DialogHeader>
              <p className="text-4xl font-bold text-[#ffcc00] mt-4">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(vehicle.price)}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 py-6 border-y border-white/10">
              <div className="flex flex-col items-center text-center gap-1">
                <Calendar className="h-5 w-5 text-[#ffcc00]" />
                <span className="text-xs text-zinc-400 uppercase">Ano</span>
                <span className="font-semibold">{vehicle.year}</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <Gauge className="h-5 w-5 text-[#ffcc00]" />
                <span className="text-xs text-zinc-400 uppercase">KM</span>
                <span className="font-semibold">
                  {vehicle.mileage.toLocaleString("pt-BR")}
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <Fuel className="h-5 w-5 text-[#ffcc00]" />
                <span className="text-xs text-zinc-400 uppercase">Tipo</span>
                <span className="font-semibold">{vehicle.fuel_type}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#ffcc00]">
                <Info className="h-5 w-5" />
                <h4 className="font-semibold">Informações do Veículo</h4>
              </div>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <p className="text-zinc-400">Câmbio:</p>
                <p className="text-right font-medium">{vehicle.transmission || "N/A"}</p>
                <p className="text-zinc-400">Cor:</p>
                <p className="text-right font-medium">{vehicle.color || "N/A"}</p>
              </div>
            </div>

            {vehicle.description && (
              <div className="space-y-2">
                <h4 className="font-semibold text-sm uppercase text-zinc-400">Descrição</h4>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {vehicle.description}
                </p>
              </div>
            )}

            {vehicle.features && vehicle.features.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-sm uppercase text-zinc-400">Opcionais</h4>
                <div className="flex flex-wrap gap-2">
                  {vehicle.features.map((feature, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="bg-white/5 text-white hover:bg-white/10 border-white/10"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={handleWhatsApp}
              className="w-full bg-[#ffcc00] text-black hover:bg-[#ffcc00]/90 text-lg font-bold h-14"
            >
              <Phone className="h-5 w-5 mr-2" />
              Tenho Interesse
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
