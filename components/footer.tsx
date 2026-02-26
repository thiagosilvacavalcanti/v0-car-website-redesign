import Link from "next/link"
import Image from "next/image"
import { Instagram, Mail, MapPin, Phone } from "lucide-react"
import { ContactForm } from "@/components/contact-form"

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-2">Entre em Contato</h2>
            <p className="text-center text-secondary-foreground/70 mb-8">
              Envie sua mensagem e nossa equipe retornará em breve
            </p>
            <ContactForm />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <Image src="/sml-logo.jpeg" alt="SML Veículos" width={150} height={50} className="h-12 w-auto mb-6" />
            <p className="text-secondary-foreground/70 mb-4">
              Sua loja de confiança em São Paulo para veículos seminovos de qualidade.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Links rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#estoque"
                  className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors"
                >
                  Estoque
                </Link>
              </li>
              <li>
                <Link
                  href="#venda"
                  className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors"
                >
                  Venda seu Carro
                </Link>
              </li>
              <li>
                <Link
                  href="#financie"
                  className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors"
                >
                  Financiamento
                </Link>
              </li>
              <li>
          
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span className="text-secondary-foreground/70">
                  Rua Augusto Carlos Bauman 870
                  <br />
                  Itaquera, SP
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span className="text-secondary-foreground/70">(11) 95804-2257</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span className="text-secondary-foreground/70">(11) 91287-1921</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <span className="text-secondary-foreground/70">smlveiculos@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Redes Sociais</h3>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/smlveiculos/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-secondary-foreground/10 hover:bg-secondary-foreground/20 flex items-center justify-center transition-colors"
                aria-label="Instagram SML Veículos"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 pt-8 text-center text-sm text-secondary-foreground/60">
          <p>&copy; {new Date().getFullYear()} SML Veículos. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
