import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { AdminHeader } from '@/components/admin/admin-header'
import { VehicleForm } from '@/components/admin/vehicle-form'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function NewVehiclePage() {
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
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para lista
        </Link>
        
        <h1 className="text-3xl font-bold text-foreground mb-8">
          Adicionar Novo Veículo
        </h1>
        
        <VehicleForm />
      </main>
    </div>
  )
}
