import { useQuery } from '@tanstack/react-query'
import { getCategoryCount, type ProductCountResponse } from '../api'

export function useCategoryCount() {
    return useQuery<ProductCountResponse[]>({
        queryKey: ['categoryCount'],
        queryFn: getCategoryCount,
        staleTime: Infinity,
        refetchInterval: 1000 * 60,
        refetchIntervalInBackground: false,
    })
}
