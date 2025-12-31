import React from 'react';
import { Link } from '@tanstack/react-router'
import { UserIcon, ShoppingCartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [isItemOnCart] = React.useState<boolean>(false);

  return (
    <div className='fixed top-0 left-0 w-full z-50 bg-app-black/90 backdrop-blur'>
      <div className='container mx-auto'>
        <div className="flex h-18 items-center justify-between gap-4">
          <Link to='/'>
            <span className='flex items-center gap-2'>
              <div className='relative'>
                <span className='font-display text-2xl font-bold text-app-purple neon-text'>GEEK</span>
                <span className='font-display text-2xl font-bold text-white neon-text'>HUB</span>
              </div>  
            </span>
          </Link>

          <div className='hidden flex-1 max-w-xl md:flex'>
            <div className='relative w-full'>
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-app-light-gray pointer-events-none" />
              <input
                type='search' 
                className='flex h-12 rounded-md border border-app-purple-gray px-3 py-2 text-base text-white ring-app-purple placeholder:text-app-light-gray focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-purple focus-visible:ring-offset-2 focus-visible:ring-offset-app-dark-gray md:text-sm w-full bg-app-dark-gray pl-10 focus:border-app-purple focus:ring-app-purple/20'
                placeholder='Buscar produtos, games, e-books...'/>
            </div>
          </div>

          <div className='hidden items-center gap-4 md:flex'>
            {isItemOnCart ? 
            (
              <Link to='/' className='h-8 w-8 flex items-center justify-center relative hover:cursor-pointer text-white'>
                <ShoppingCartIcon className="h-6 w-6 text-white stroke-1.5" />
                {isItemOnCart && (
                  <span className="absolute -top-1 -right-2 flex items-center justify-center h-5 w-5 rounded-full bg-app-pink text-[0.625rem] text-white font-bold border-2 border-black">
                    3
                  </span>
                )}
              </Link>
            ) :
            (
              <Link to='/' className='h-8 w-8 flex items-center justify-center hover:cursor-pointer text-white'>
                <ShoppingCartIcon className="h-6 w-6 text-white stroke-1.5" />
              </Link>
            )}

            <Link to='/' className='h-8 w-8 flex items-center justify-center hover:cursor-pointer text-white'>
              <UserIcon className="h-6 w-6 text-white stroke-1.5" />
            </Link>
            <button className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm text-white bg-[linear-gradient(90deg,#8c59c0,#d9269d)] hover:opacity-90 hover:cursor-pointer h-10 w-20 px-4 py-2 font-display font-semibold'>
              Entrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
