# Instruções de Deploy - SML Veículos

Este documento contém todas as instruções necessárias para fazer o deploy do site da SML Veículos.

## 📋 Pré-requisitos

- Conta no Supabase (gratuita)
- Conta na Vercel (gratuita) ou Locaweb com suporte a Node.js

## 🗄️ Configuração do Banco de Dados (Supabase)

### 1. Criar Conta no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie uma conta gratuita
3. Clique em "New Project"
4. Preencha:
   - Nome do projeto: `sml-veiculos`
   - Database Password: (escolha uma senha forte)
   - Region: South America (São Paulo)

### 2. Configurar Banco de Dados

1. No painel do Supabase, vá em **SQL Editor** (menu lateral)
2. Clique em **"New Query"**
3. Copie e cole o conteúdo do arquivo `scripts/001_create_vehicles_schema.sql`
4. Clique em **"Run"** para executar
5. Repita o processo com o arquivo `scripts/002_seed_initial_data.sql` para adicionar dados de exemplo

### 3. Configurar Autenticação

1. No painel do Supabase, vá em **Authentication** → **Providers**
2. Certifique-se que **Email** está habilitado
3. Vá em **Authentication** → **Users**
4. Clique em **"Add User"** → **"Create new user"**
5. Preencha:
   - Email: `admin@smlveiculos.com`
   - Password: `sua-senha-segura`
   - Auto Confirm User: ✅ (marque esta opção)

### 4. Obter Credenciais

1. Vá em **Settings** → **API**
2. Copie as seguintes informações:
   - **Project URL** (example: https://xxxxx.supabase.co)
   - **anon public key** (começa com eyJ...)

## 🌐 Deploy na Vercel (Recomendado)

### Opção 1: Deploy via GitHub (Mais Fácil)

1. Faça upload do código para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique em **"New Project"**
4. Importe seu repositório GitHub
5. Configure as variáveis de ambiente:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=sua-url-do-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-do-supabase
\`\`\`

6. Clique em **"Deploy"**

### Opção 2: Deploy via CLI Vercel

\`\`\`bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel

# Em produção
vercel --prod
\`\`\`

## 🏠 Deploy na Locaweb

### Requisitos da Locaweb

- Plano de hospedagem com suporte a Node.js 18+
- Acesso SSH ou painel de controle

### Passos para Deploy

1. **Build do projeto:**
\`\`\`bash
npm run build
\`\`\`

2. **Arquivos necessários:**
   - Pasta `.next`
   - Pasta `public`
   - Arquivo `package.json`
   - Arquivo `next.config.mjs`

3. **Configurar variáveis de ambiente no painel Locaweb:**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. **Comando de inicialização:**
\`\`\`bash
npm start
\`\`\`

### Alternativa: Deploy com PM2

\`\`\`bash
# Instalar PM2
npm install pm2 -g

# Iniciar aplicação
pm2 start npm --name "sml-veiculos" -- start

# Salvar configuração
pm2 save

# Auto-iniciar no boot
pm2 startup
\`\`\`

## 🔐 Acessar Painel Administrativo

1. Acesse: `seu-dominio.com/auth/login`
2. Use as credenciais criadas no Supabase:
   - Email: `admin@smlveiculos.com`
   - Senha: a senha que você definiu

## ✅ Checklist Pós-Deploy

- [ ] Site acessível no domínio
- [ ] Login funcionando no `/auth/login`
- [ ] Painel admin acessível em `/admin`
- [ ] Consegue adicionar novos veículos
- [ ] Veículos aparecem na página inicial
- [ ] Formulários redirecionam para WhatsApp
- [ ] Botão flutuante do WhatsApp funcionando
- [ ] Links do Instagram funcionando

## 📱 Testar Funcionalidades

### Página Inicial
- ✅ Logo e menu funcionando
- ✅ Hero banner exibindo
- ✅ Veículos em destaque aparecendo
- ✅ Botão WhatsApp flutuante visível

### Formulários
- ✅ Venda seu Carro → WhatsApp
- ✅ Financiamento → WhatsApp
- ✅ Contato → WhatsApp

### Painel Admin
- ✅ Login funcionando
- ✅ Lista de veículos carregando
- ✅ Adicionar novo veículo
- ✅ Editar veículo existente
- ✅ Deletar veículo

## 🆘 Problemas Comuns

### Erro: "Invalid login credentials"
- Verifique se o usuário foi confirmado no Supabase (Authentication → Users)
- Confirme manualmente marcando o checkbox "Email Confirmed"

### Erro: "Failed to fetch" nos formulários
- Verifique se as variáveis de ambiente estão corretas
- Confirme que as políticas RLS estão aplicadas no Supabase

### Imagens não aparecem
- Certifique-se que as URLs das imagens são públicas
- Use serviços como Imgur, Google Photos, ou Supabase Storage

### Site não carrega na Locaweb
- Verifique se a porta está correta (geralmente 3000)
- Confirme que o Node.js 18+ está instalado
- Verifique os logs de erro do servidor

## 📞 Contatos Configurados

- WhatsApp: (11) 95804-2257
- Telefone: (11) 91287-1921
- Endereço: Rua Augusto Carlos Bauman 870
- Instagram: @smlveiculos

---

**Dúvidas?** Entre em contato com o suporte técnico ou consulte a documentação do Next.js e Supabase.
