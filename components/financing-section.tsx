import { Card, CardContent } from '@/components/ui/card'
import { CreditCard, Clock, Shield, Percent } from 'lucide-react'
import { FinancingForm } from './financing-form'

export function FinancingSection() {
  const features = [
    {
      icon: CreditCard,
      title: 'Aprovação rapida',
      description: 'Análise de crédito imediata',
    },
    {
      icon: Percent,
      title: 'Taxas Competitivas',
      description: 'As melhores taxas do mercado',
    },
    {
      icon: Clock,
      title: 'Prazos Flexíveis',
      description: 'Parcelamento em até 60 meses',
    },
    {
      icon: Shield,
      title: 'Processo Seguro',
      description: 'Parceiros confiáveis e regulamentados',
    },
  ]

  return (
    <section id="financie" className="py-16 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Financie seu Sonho</h2>
          <p className="text-xl text-secondary-foreground/80 max-w-2xl mx-auto">
            Trabalhamos com os melhores bancos e financeiras para oferecer as condições ideais para você
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-card/10 border-secondary-foreground/20 hover:bg-card/20 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-accent mx-auto mb-4 flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-secondary-foreground">{feature.title}</h3>
                <p className="text-secondary-foreground/70">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <FinancingForm />
        </div>
      </div>
    </section>
  )
}
