"use client"

import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative w-full bg-secondary text-secondary-foreground overflow-hidden">
      <div className="absolute inset-0 bg-[url('/luxury-car-showroom.png')] bg-cover bg-center opacity-10" />
      
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-block bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Novidade na Loja
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            Encontre o carro dos{' '}
            <span className="text-primary">seus Sonhos</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-secondary-foreground/80 text-pretty leading-relaxed">
            Veículos seminovos de qualidade com as melhores condições de financiamento e garantia estendida.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="text-lg px-8 py-6 cursor-pointer"
              onClick={() => {
                document.getElementById("estoque")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Ver Estoque
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-black text-lg px-8 py-6">
              Venda seu Carro
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
