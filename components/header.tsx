'use client'  
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, Clock, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
export function Header() {
  const navItems = [
    { name: "Estoque", href: "#estoque" },
    { name: "Venda seu Carro", href: "#venda" },
    { name: "Financie", href: "#financie" },
  ]

  const phoneNumber = "5511958042257"
    const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank")
  }

  return (
    <header className="w-full border-b border-border bg-black text-white">
      <div className="bg-secondary text-secondary-foreground py-2">
        <div className="container mx-auto px-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Seg - Sex: 8h às 18h | Sáb: 8h às 12h</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>(11) 95804-2257</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>(11) 91287-1921</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/sml-logo.jpeg" alt="SML Veículos" width={180} height={60} className="h-14 w-auto" priority />
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Button  onClick={handleClick}  variant="outline" size="lg" className="button-fale border-white text-black hover:bg-white hover:text-black">
              <Phone className="h-4 w-4 mr-2" />
              Fale Conosco
            </Button>
          </div>

          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="h-6 w-6 text-[#ffcc00]" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-black text-white border-white/20">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium hover:text-primary transition-colors text-white"
                  >
                    {item.name}
                  </Link>
                ))}
                <Button className="mt-4 bg-[#ffcc00] text-black hover:bg-[#ffcc00]/90">
                  <Phone className="h-4 w-4 mr-2" />
                  Fale Conosco
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
