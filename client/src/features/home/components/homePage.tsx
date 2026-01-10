import { useQuery } from '@tanstack/react-query'
import { type Product, type ProductsResponse, getProducts } from '../api'

export function HomePage() {
  const { data, isPending, error} = useQuery<ProductsResponse>({ 
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: Infinity,
    refetchInterval: 1000 * 30,
    refetchIntervalInBackground: false,
  })

  if (isPending) {
    return <div className='pt-18'>CARREGANDO</div>
  }

  if (error) {
    return <div className='pt-18'>ERROR</div>
  }

  return (
    <div className='bg-app-dark-gray flex w-full h-full'>
      <div className='text-white pt-18'>
        {data?.products.map((each: Product) => (
          <p className='p-2' key={each.id}>{each.title}: R$ {each.price} - {each.onSpotlight.toString()}</p>
        ))}
      </div>
    </div>
  )
}