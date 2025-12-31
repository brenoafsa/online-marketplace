import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <div className='bg-gray-400'>
      <div className='container mx-auto px-6'>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to='/'>
            <span className='flex items-center gap-2'>
              <div className='relative'>
                <span className='font-display text-2xl font-bold text-primary neon-text'>GEEK</span>
                <span className='font-display text-2xl font-bold text-primary neon-text'>HUB</span>
              </div>  
            </span>
          </Link>

          <div className='hidden flex-1 max-w-xl md:flex'>
            <div className='relative w-full'>
              <img/>
              <input 
                type='search' 
                className='flex h-10 rounded-md border px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm w-full bg-amber-800 pl-10 border-border/50 focus:border-primary focus:ring-primary/20'
                placeholder='Buscar produtos, games, e-books...'/>
            </div>
          </div>

          <div className='hidden items-center gap-2 md:flex'>
            <button>
              Carrinho
            </button>
            <button>
              Perfil
            </button>
            <button>
              Entrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
