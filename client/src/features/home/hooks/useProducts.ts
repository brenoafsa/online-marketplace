import { useQuery } from '@tanstack/react-query'
import { getProducts, type ProductsResponse } from '../api'

export function useProducts() {
    return useQuery<ProductsResponse>({
        queryKey: ['products'],
        queryFn: getProducts,
        staleTime: Infinity,
        refetchInterval: 1000 * 60,
        refetchIntervalInBackground: false,
    })
}
