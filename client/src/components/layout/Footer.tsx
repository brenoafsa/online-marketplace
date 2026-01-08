import { Twitter, Instagram, Youtube, Github } from "lucide-react"
import { EnvelopeIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <div className='bg-app-black flex w-screen h-full px-16 py-16 flex-col'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto w-full">
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <span className="font-display text-2xl font-bold text-app-purple">GEEK</span>
                <span className="font-display text-2xl font-bold text-app-blue">HUB</span>
            </div>
            <p className="text-muted-foreground text-sm">O maior marketplace de produtos digitais para a comunidade geek do Brasil.</p>
            <div className="flex gap-3">
                <button className="hover:cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm text-white font-medium h-9 w-9 hover:bg-app-purple/10 hover:text-app-purple">
                    <Twitter className="w-5 h-5"/>
                </button>
                <button className="hover:cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm text-white font-medium h-9 w-9 hover:bg-app-purple/10 hover:text-app-purple">
                    <Instagram className="w-5 h-5"/>
                </button>
                <button className="hover:cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm text-white font-medium h-9 w-9 hover:bg-app-purple/10 hover:text-app-purple">
                    <Youtube className="w-5 h-5"/>
                </button>
                <button className="hover:cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm text-white font-medium h-9 w-9 hover:bg-app-purple/10 hover:text-app-purple">
                    <Github className="w-5 h-5"/>
                </button>
            </div>
        </div>
        <div className="space-y-4">
            <h4 className="font-display font-bold text-white">Marketplace</h4>
            <ul className="space-y-2">
                <li>
                    <a href="/" className="text-sm text-app-light-gray hover:text-white transition-colors">Explorar Produtos</a>
                </li>
                <li>
                    <a href="/" className="text-sm text-app-light-gray hover:text-white transition-colors">Categorias</a>
                </li>
                <li>
                    <a href="/" className="text-sm text-app-light-gray hover:text-white transition-colors">Vender Produtos</a>
                </li>
                <li>
                    <a href="/" className="text-sm text-app-light-gray hover:text-white transition-colors">Afiliados</a>
                </li>
            </ul>
        </div>
        <div className="space-y-4">
            <h4 className="font-display font-bold text-white">Suporte</h4>
            <ul className="space-y-2">
                <li>
                    <a href="/" className="text-sm text-app-light-gray hover:text-white transition-colors">Central de Ajuda</a>
                </li>
                <li>
                    <a href="/" className="text-sm text-app-light-gray hover:text-white transition-colors">FAQ</a>
                </li>
                <li>
                    <a href="/" className="text-sm text-app-light-gray hover:text-white transition-colors">Contato</a>
                </li>
                <li>
                    <a href="/" className="text-sm text-app-light-gray hover:text-white transition-colors">Termos de Uso</a>
                </li>
            </ul>
        </div>
        <div className="space-y-4">
            <h4 className="font-display font-bold text-white">Newsletter</h4>
            <p className="text-sm text-app-light-gray">Receba novidades e ofertas exclusivas diretamente no seu e-mail.</p>
            <div className="flex gap-2">
                <input type="email" 
                placeholder="seu@email.com"
                className="flex h-10 w-full rounded-md border px-3 py-2 text-base text-white ring-offset-background placeholder:text-app-light-gray md:text-sm bg-app-dark-gray/50 border-border/50 focus:border-app-pink"/>
                <button className="hover:cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-[linear-gradient(90deg,#8c59c0,#d9269d)] text-white hover:bg-white/90 h-10 px-3 py-2 shrink-0">
                    <EnvelopeIcon className="h-4 w-4"/>
                </button>
            </div>
        </div>
      </div>
      <div className="mt-12 pt-8 w-full border-t border-app-light-gray/50 flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
          <p className="text-sm text-app-light-gray">© 2026 GeekHub. Todos os direitos reservados.</p>
          <div className="flex gap-6">
              <a href="/" className="text-sm text-app-light-gray hover:text-app-pink transition-colors">Privacidade</a>
              <a href="/" className="text-sm text-app-light-gray hover:text-app-pink transition-colors">Cookies</a>
              <a href="/" className="text-sm text-app-light-gray hover:text-app-pink transition-colors">Licenças</a>
          </div>
      </div>
    </div>
  )
}