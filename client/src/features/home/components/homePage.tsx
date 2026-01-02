import { useQuery } from '@tanstack/react-query'
import { type Product, getProducts } from '../api'

export function HomePage() {
  const { data, isPending, error} = useQuery<Product[]>({ 
    queryKey: ['products'],
    queryFn: getProducts 
  })

  if (isPending) {
    return <div className='pt-18'>CARREGANDO</div>
  }

  if (error) {
    return <div className='pt-18'>ERROR</div>
  }

  return (
    <>
      <div className='bg-app-dark-gray text-white pt-18'>
        {data?.map((each: Product) => (
          <p className='p-2' key={each.id}>{each.title}: R$ {each.price} - {each.onSpotlight.toString()}</p>
        ))}
      </div>
    </>
  )
}