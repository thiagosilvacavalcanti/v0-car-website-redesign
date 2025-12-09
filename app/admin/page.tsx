import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { VehiclesList } from '@/components/admin/vehicles-list'
import { AdminHeader } from '@/components/admin/admin-header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'

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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gerenciar Veículos</h1>
            <p className="text-muted-foreground mt-1">
              Adicione, edite ou remova veículos do estoque
            </p>
          </div>
          
          <Link href="/admin/vehicles/new">
            <Button size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              Adicionar Veículo
            </Button>
          </Link>
        </div>
        
        <VehiclesList />
      </main>
    </div>
  )
}
