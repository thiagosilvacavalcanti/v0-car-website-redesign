import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { VehiclesList } from '@/components/admin/vehicles-list'
import { AdminHeader } from '@/components/admin/admin-header'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { Plus, Car, Tags } from 'lucide-react'
import { BrandsManager } from '@/components/admin/brands-manager'

export default async function AdminPage() {
  const cookieStore = await cookies()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader user={user} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="vehicles">
          <div className="flex items-center justify-between mb-8">
            <TabsList>
              <TabsTrigger value="vehicles" className="gap-2">
                <Car className="h-4 w-4" />
                Veiculos
              </TabsTrigger>
              <TabsTrigger value="brands" className="gap-2">
                <Tags className="h-4 w-4" />
                Marcas
              </TabsTrigger>
            </TabsList>

            <Link href="/admin/vehicles/new">
              <Button size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                Adicionar Veiculo
              </Button>
            </Link>
          </div>

          <TabsContent value="vehicles">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-foreground">Gerenciar Veiculos</h2>
              <p className="text-muted-foreground mt-1">
                Adicione, edite ou remova veiculos do estoque
              </p>
            </div>
            <VehiclesList />
          </TabsContent>

          <TabsContent value="brands">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-foreground">Gerenciar Marcas</h2>
              <p className="text-muted-foreground mt-1">
                Adicione marcas e faca upload dos logos
              </p>
            </div>
            <BrandsManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
