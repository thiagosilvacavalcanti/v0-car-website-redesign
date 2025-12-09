import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { Calendar, Gauge, Fuel } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export async function VehicleGrid() {
  const supabase = await createClient()
  
  const { data: vehicles } = await supabase
    .from('vehicles')
    .select('*')
    .eq('status', 'available')
    .order('created_at', { ascending: false })
    .limit(6)

  return (
    <section id="estoque" className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Últimas Novidades</h2>
          <p className="text-xl text-muted-foreground">
            Confira os veículos recém-chegados em nossa loja
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles?.map((vehicle) => (
            <Card key={vehicle.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={vehicle.image_url || `/placeholder.svg?height=300&width=400&query=${vehicle.brand} ${vehicle.model}`}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {vehicle.featured && (
                  <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                    Destaque
                  </Badge>
                )}
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">{vehicle.brand} {vehicle.model}</h3>
                <p className="text-3xl font-bold text-primary mb-4">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(vehicle.price)}
                </p>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{vehicle.year}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Gauge className="h-4 w-4" />
                    <span>{vehicle.mileage.toLocaleString('pt-BR')} km</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Fuel className="h-4 w-4" />
                    <span>{vehicle.fuel_type}</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="p-6 pt-0 gap-2">
                <Button className="flex-1">Ver Detalhes</Button>
                <Button variant="outline" className="flex-1">WhatsApp</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="px-8">
            Ver Todo o Estoque
          </Button>
        </div>
      </div>
    </section>
  )
}
