import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search } from 'lucide-react'

export function VehicleSearch() {
  return (
    <section className="py-12 bg-muted">
      <div className="container mx-auto px-4">
        <div className="bg-card rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Encontre seu Veículo</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Marca" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chevrolet">Chevrolet</SelectItem>
                <SelectItem value="fiat">Fiat</SelectItem>
                <SelectItem value="ford">Ford</SelectItem>
                <SelectItem value="honda">Honda</SelectItem>
                <SelectItem value="hyundai">Hyundai</SelectItem>
                <SelectItem value="toyota">Toyota</SelectItem>
                <SelectItem value="volkswagen">Volkswagen</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Modelo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Modelos</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Ano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
                <SelectItem value="2020">2020</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Preço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-50000">Até R$ 50.000</SelectItem>
                <SelectItem value="50000-100000">R$ 50.000 - R$ 100.000</SelectItem>
                <SelectItem value="100000-150000">R$ 100.000 - R$ 150.000</SelectItem>
                <SelectItem value="150000+">Acima de R$ 150.000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4 mt-6">
            <Input placeholder="Digite sua busca..." className="flex-1" />
            <Button size="lg" className="px-8">
              <Search className="h-5 w-5 mr-2" />
              Buscar
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
