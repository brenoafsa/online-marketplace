import type { FiltersQuery } from '@/features/product-list/api';
import { useCategoryCount } from '../hooks/useCategoryCount';
import { CategoryCard } from './categoryCard'
import { Link } from '@tanstack/react-router';

export function HomePage() {
  const { data: categoryCountData, isPending: isCategoryCountPending, error: categoryCountError } = useCategoryCount();

  if (isCategoryCountPending) {
    return <div className='pt-18 text-center text-white'>CARREGANDO</div>
  }

  if (categoryCountError) {
    return <div className='pt-18 text-center text-red-500'>ERROR</div>
  }

  return (
    <div className='bg-app-dark-gray px-4 pb-20'>
      <div className='text-center mb-12 pt-18'>
        <h2 className='font-display text-3xl md:text-4xl font-bold mb-4 text-white'>
          Explore por{' '}
          <span className='text-app-purple'>Categoria</span>
        </h2>
        <p className='text-white max-w-2xl mx-auto'>
          Encontre exatamente o que você procura em nosso vasto catálogo de produtos digitais
        </p>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto'>
        {categoryCountData.map((each) => (
          <Link
            key={each.category}
            to="/products"
            search={{ category: (each.category).toLowerCase() as FiltersQuery['category'], page: 1, sort_by: 'created-asc' }}
            className="block"
          >
            <CategoryCard
              category={each.category}
              quantity={each.count}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}