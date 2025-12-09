import { LoginForm } from '@/components/auth/login-form'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral to-neutral-dark p-4">
      <div className="w-full max-w-md">
        <div className="bg-background rounded-lg shadow-2xl p-8">
          <div className="flex justify-center mb-8">
            <Link href="/">
              <Image
                src="/sml-logo.jpeg"
                alt="SML Veículos"
                width={200}
                height={60}
                className="h-16 w-auto"
              />
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">Painel Administrativo</h1>
          <p className="text-muted-foreground text-center mb-8">
            Faça login para gerenciar o estoque
          </p>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
