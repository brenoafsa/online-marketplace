import { useNavigate } from '@tanstack/react-router'
import { Route } from '@/routes/products'
import { z } from 'zod'

export const productsSearchSchema = z.object({
    category: z.string(),
    page: z.number(),
    sort_by: z.string(),
    sale: z.boolean().optional(),
    spotlight: z.boolean().optional(),
    price_gte: z.number().optional(),
    price_lte: z.number().optional()
})

export function ProductListPage() {
    const { sort_by, sale, price_gte, price_lte } = Route.useSearch()

    const navigate = useNavigate({ from: Route.fullPath })

    const setSort = (newSort: string) => {
        navigate({
            search: (prev) => ({ ...prev, page: 1, sort: newSort }),
        })
    }

    return (
        <div className='pt-18'>
            <h1>Sort: {sort_by}</h1>
            <button onClick={() => setSort('priceAsc')}>priceAsc</button>
            <h1>Sale: {(sale) ? 'true' : 'false'}</h1>
            <h1>Price_gte: {price_gte}</h1>
            <h1>Price_lte: {price_lte}</h1>
        </div>
    )
}