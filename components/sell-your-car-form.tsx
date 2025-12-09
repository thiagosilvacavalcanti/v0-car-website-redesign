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

export function SellYourCarForm() {
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

    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
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

    const whatsappMessage = `*Solicitação de Avaliação de Veículo*%0A%0A*Nome:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Telefone:* ${encodeURIComponent(phone)}%0A*Informações do Veículo:*%0A${encodeURIComponent(message)}`
    const whatsappNumber = "5511958042257"
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

    // Open WhatsApp
    window.open(whatsappUrl, "_blank")

    toast({
      title: "Redirecionando para WhatsApp",
      description: "Continue a conversa pelo WhatsApp para finalizar sua solicitação.",
    })

    setOpen(false)
    e.currentTarget.reset()
    setIsLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="px-8">
          Avaliar Meu Carro
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Avalie seu Carro</DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo e continue pelo WhatsApp para avaliar seu veículo.
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
            <Label htmlFor="message">
              Informações do Veículo <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Marca, modelo, ano, quilometragem..."
              rows={4}
              required
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
