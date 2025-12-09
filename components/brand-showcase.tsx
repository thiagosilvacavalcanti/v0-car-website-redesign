import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'

export async function BrandShowcase() {
  const supabase = await createClient()
  
  const { data: brands } = await supabase
    .from('car_brands')
    .select('*')
    .eq('active', true)
    .order('display_order', { ascending: true })

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Marcas Disponíveis</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {brands?.map((brand) => (
            <div
              key={brand.id}
              className="flex items-center justify-center p-4 bg-card rounded-lg hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="relative w-20 h-20">
                <Image
                  src={brand.logo_url || `/placeholder.svg?height=80&width=80&query=${brand.name} car logo`}
                  alt={brand.name}
                  fill
                  className="object-contain grayscale hover:grayscale-0 transition-all"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
