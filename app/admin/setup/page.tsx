import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Database, Play, CheckCircle2 } from 'lucide-react'

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Configuração Inicial</h1>
          <p className="text-muted-foreground">
            Execute os scripts SQL para criar as tabelas no banco de dados
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Scripts SQL Disponíveis
            </CardTitle>
            <CardDescription>
              Execute estes scripts na ordem para configurar o banco de dados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">001_create_vehicles_schema.sql</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Cria as tabelas: vehicles, car_brands, vehicle_features, contact_leads
                  </p>
                  <Button asChild>
                    <a href="/scripts/001_create_vehicles_schema.sql" download>
                      <Play className="h-4 w-4 mr-2" />
                      Baixar Script
                    </a>
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">002_seed_initial_data.sql</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Adiciona dados iniciais: marcas de carros e veículos de exemplo
                  </p>
                  <Button asChild>
                    <a href="/scripts/002_seed_initial_data.sql" download>
                      <Play className="h-4 w-4 mr-2" />
                      Baixar Script
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 mt-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Como Executar os Scripts
              </h3>
              <ol className="space-y-2 text-sm text-muted-foreground ml-7 list-decimal">
                <li>Vá para o painel do Supabase: <strong>SQL Editor</strong></li>
                <li>Clique em <strong>New Query</strong></li>
                <li>Copie e cole o conteúdo do script <strong>001_create_vehicles_schema.sql</strong></li>
                <li>Clique em <strong>Run</strong> para executar</li>
                <li>Repita os passos 2-4 para o script <strong>002_seed_initial_data.sql</strong></li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/50 bg-yellow-500/5">
          <CardHeader>
            <CardTitle className="text-yellow-600 dark:text-yellow-500">
              Problema com Login?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>Se você está tendo erro "Invalid login credentials", verifique:</p>
            <ul className="space-y-2 ml-5 list-disc text-muted-foreground">
              <li>
                <strong>Email confirmado:</strong> Vá em Supabase Dashboard → Authentication → Users
                e verifique se o usuário tem "Confirmed" marcado
              </li>
              <li>
                <strong>Senha correta:</strong> Se necessário, use "Reset Password" ou crie um novo usuário
              </li>
              <li>
                <strong>Email confirmado automaticamente:</strong> No Supabase Dashboard → Authentication → Settings →
                Email Templates, desabilite "Enable email confirmations"
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
