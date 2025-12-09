'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Edit, Trash2, Eye } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Vehicle = {
  id: string
  brand: string
  model: string
  year: number
  price: number
  mileage: number
  fuel_type: string
  transmission: string
  color: string
  status: string
  featured: boolean
  image_url: string | null
}

export function VehiclesList() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    loadVehicles()
  }, [])

  const loadVehicles = async () => {
    const { data } = await supabase
      .from('vehicles')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) {
      setVehicles(data)
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este veículo?')) return
    
    await supabase.from('vehicles').delete().eq('id', id)
    loadVehicles()
  }

  if (loading) {
    return <div className="text-center py-12">Carregando veículos...</div>
  }

  if (vehicles.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-muted-foreground">Nenhum veículo cadastrado ainda.</p>
        <Link href="/admin/vehicles/new">
          <Button className="mt-4">Adicionar Primeiro Veículo</Button>
        </Link>
      </Card>
    )
  }

  return (
    <div className="grid gap-6">
      {vehicles.map((vehicle) => (
        <Card key={vehicle.id} className="p-6">
          <div className="flex gap-6">
            <div className="w-48 h-32 relative flex-shrink-0 bg-neutral-light rounded-lg overflow-hidden">
              {vehicle.image_url ? (
                <Image
                  src={vehicle.image_url || "/placeholder.svg"}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  Sem imagem
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {vehicle.brand} {vehicle.model}
                  </h3>
                  <p className="text-muted-foreground">
                    {vehicle.year} • {vehicle.mileage.toLocaleString()} km
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">
                    R$ {vehicle.price.toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2 mb-4">
                <Badge variant={vehicle.status === 'available' ? 'default' : 'secondary'}>
                  {vehicle.status === 'available' ? 'Disponível' : 
                   vehicle.status === 'reserved' ? 'Reservado' : 'Vendido'}
                </Badge>
                {vehicle.featured && (
                  <Badge variant="outline" className="border-accent text-accent">
                    Destaque
                  </Badge>
                )}
                <Badge variant="outline">{vehicle.fuel_type}</Badge>
                <Badge variant="outline">{vehicle.transmission}</Badge>
              </div>
              
              <div className="flex gap-2">
                <Link href={`/admin/vehicles/${vehicle.id}`}>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Edit className="h-4 w-4" />
                    Editar
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2 text-destructive hover:bg-destructive hover:text-white"
                  onClick={() => handleDelete(vehicle.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  Deletar
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
