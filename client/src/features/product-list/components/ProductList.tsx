import { useNavigate } from '@tanstack/react-router'
import { Route } from '@/routes/products'
import { z } from 'zod'

export const productsSearchSchema = z.object({
    category: z.string(),
    sort: z.string().optional(),
})

export function ProductListPage() {
    const { category, sort } = Route.useSearch()

    const navigate = useNavigate({ from: Route.fullPath })

    const setCategory = (newCategory: string) => {
        navigate({
            search: (prev) => ({ ...prev, category: newCategory }),
        })
    }

    const setSort = (newSort: string) => {
        navigate({
            search: (prev) => ({ ...prev, sort: newSort }),
        })
    }

    return (
        <div className='pt-18'>
            <h1>Categoria: {category}</h1>
            <button onClick={() => setCategory('games')}>Ir para Games</button>
            <h1>Sort: {sort}</h1>
            <button onClick={() => setSort('priceAsc')}>priceAsc</button>
        </div>
    )
}