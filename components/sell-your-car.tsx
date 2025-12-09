import { Card, CardContent } from '@/components/ui/card'
import { Check } from 'lucide-react'
import { SellYourCarForm } from './sell-your-car-form'

export function SellYourCar() {
  const benefits = [
    'Avaliação gratuita e rápida',
    'Pagamento imediato',
    'Fazemos toda a burocracia',
    'Melhores preços do mercado',
  ]

  return (
    <section id="venda" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-balance">
              Venda seu Carro de Forma Rápida e Segura
            </h2>
            <p className="text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
              Oferecemos a melhor avaliação do mercado para o seu veículo. 
              Processo simples, rápido e sem complicações.
            </p>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <span className="text-lg">{benefit}</span>
                </div>
              ))}
            </div>

            <SellYourCarForm />
          </div>

          <Card className="overflow-hidden">
            <div className="h-96 bg-[url('/person-selling-car-handshake-dealership.jpg')] bg-cover bg-center" />
            <CardContent className="p-8 bg-secondary text-secondary-foreground">
              <h3 className="text-2xl font-bold mb-2">Processo Simplificado</h3>
              <p className="text-lg">
                Agende uma avaliação gratuita e receba uma proposta em minutos.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
