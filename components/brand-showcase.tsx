"use client"

import Image from "next/image"
import { useEffect, useState, useCallback } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Brand {
  id: string
  name: string
  logo_url: string | null
  active: boolean
  display_order: number
}

export function BrandShowcase() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    async function fetchBrands() {
      const { data } = await supabase
        .from("car_brands")
        .select("*")
        .eq("active", true)
        .order("display_order", { ascending: true })

      if (data) setBrands(data)
    }
    fetchBrands()
  }, [])

  const itemsPerPage = 4
  const maxIndex = Math.max(0, brands.length - itemsPerPage)

  const next = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }, [maxIndex])

  const prev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }, [])

  if (brands.length === 0) return null

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
          Marcas Disponíveis
        </h2>

        <div className="relative">
          {/* Botao anterior */}
          {currentIndex > 0 && (
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="absolute -left-4 sm:-left-5 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background shadow-md border-border"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Marcas anteriores</span>
            </Button>
          )}

          {/* Carrossel */}
          <div className="overflow-hidden mx-6 sm:mx-8">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
              }}
            >
              {brands.map((brand) => (
                <div
                  key={brand.id}
                  className="flex-shrink-0 px-2 sm:px-4"
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-card rounded-lg hover:shadow-md transition-shadow cursor-pointer aspect-square">
                    <div className="relative w-14 h-14 sm:w-20 sm:h-20">
                      <Image
                        src={
                          brand.logo_url ||
                          `/placeholder.svg?height=80&width=80&query=${brand.name} car logo`
                        }
                        alt={brand.name}
                        fill
                        className="object-contain grayscale hover:grayscale-0 transition-all"
                      />
                    </div>
                    <span className="mt-2 text-xs sm:text-sm font-medium text-muted-foreground text-center truncate w-full">
                      {brand.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botao proximo */}
          {currentIndex < maxIndex && (
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="absolute -right-4 sm:-right-5 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background shadow-md border-border"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Proximas marcas</span>
            </Button>
          )}
        </div>

        {/* Indicadores */}
        {brands.length > itemsPerPage && (
          <div className="flex justify-center gap-1.5 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentIndex
                    ? "bg-primary w-6"
                    : "bg-muted-foreground/20 w-1.5"
                }`}
              >
                <span className="sr-only">Ir para pagina {i + 1}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
