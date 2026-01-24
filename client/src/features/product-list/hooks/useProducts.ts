import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { getProducts, type ProductsResponse, type FiltersQuery } from '../api'

export function useProducts(data: FiltersQuery) {
    return useQuery<ProductsResponse>({
        queryKey: ['products', data],
        queryFn: () => getProducts(data),
        staleTime: Infinity,
        refetchInterval: 1000 * 60,
        refetchIntervalInBackground: false,
        placeholderData: keepPreviousData
    })
}
