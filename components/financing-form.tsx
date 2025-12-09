"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

export function FinancingForm() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const message = formData.get("message") as string

    if (!name.trim() || !email.trim() || !phone.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um email válido.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Validate phone
    const phoneRegex = /[\d()[\]\s-]{10,}/
    if (!phoneRegex.test(phone)) {
      toast({
        title: "Telefone inválido",
        description: "Por favor, insira um telefone válido.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    const vehicleInfo = message ? `%0A*Veículo de Interesse:*%0A${encodeURIComponent(message)}` : ""
    const whatsappMessage = `*Solicitação de Financiamento*%0A%0A*Nome:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Telefone:* ${encodeURIComponent(phone)}${vehicleInfo}`
    const whatsappNumber = "5511958042257"
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

    // Open WhatsApp
    window.open(whatsappUrl, "_blank")

    toast({
      title: "Redirecionando para WhatsApp",
      description: "Continue a conversa pelo WhatsApp para receber as melhores condições.",
    })

    setOpen(false)
    e.currentTarget.reset()
    setIsLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" variant="default" className="px-8 bg-accent text-accent-foreground hover:bg-accent/90">
          Simular Financiamento
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Simular Financiamento</DialogTitle>
          <DialogDescription>
            Preencha seus dados e continue pelo WhatsApp para receber as melhores condições.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Nome Completo <span className="text-destructive">*</span>
            </Label>
            <Input id="name" name="name" placeholder="Seu nome" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">
              E-mail <span className="text-destructive">*</span>
            </Label>
            <Input id="email" name="email" type="email" placeholder="seu@email.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">
              Telefone/WhatsApp <span className="text-destructive">*</span>
            </Label>
            <Input id="phone" name="phone" placeholder="(00) 00000-0000" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Qual veículo você deseja financiar?</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Informe o modelo de interesse e valor aproximado..."
              rows={4}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Enviando..." : "Continuar no WhatsApp"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
