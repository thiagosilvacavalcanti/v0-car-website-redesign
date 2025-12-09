'use client'

import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { Button } from '@/components/ui/button'
import { LogOut, Home } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { User } from '@supabase/supabase-js'

export function AdminHeader({ user }: { user: User }) {
  const router = useRouter()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <header className="bg-neutral text-white border-b border-neutral-dark">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin">
            <Image
              src="/sml-logo.jpeg"
              alt="SML Veículos"
              width={150}
              height={45}
              className="h-12 w-auto"
            />
          </Link>
          <span className="text-sm text-neutral-light">
            Painel Administrativo
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-black text-sm text-neutral-light">{user.email}</span>
          <Link href="/">
            <Button variant="outline" size="sm" className="text-black gap-2">
              <Home className="h-4 w-4" />
              Ver Site
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={handleLogout} className="text-black gap-2">
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </div>
    </header>
  )
}
