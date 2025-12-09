"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export function WhatsAppFloatButton() {
  const pathname = usePathname()
  const phoneNumber = "5511958042257"

  const isAdminOrAuth = pathname?.startsWith("/admin") || pathname?.startsWith("/auth")

  if (isAdminOrAuth) return null

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank")
  }

  return (
    <Button
      onClick={handleClick}
      size="icon"
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 bg-[#25D366] hover:bg-[#20BA5A] z-50"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <MessageCircle className="h-7 w-7 text-white" />
    </Button>
  )
}
