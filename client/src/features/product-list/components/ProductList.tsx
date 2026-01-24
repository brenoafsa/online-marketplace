import { useNavigate } from '@tanstack/react-router'
import { Route } from '@/routes/products'
import { useProducts } from '../hooks/useProducts'

export function ProductListPage() {
    const { category, page, sort_by, sale, spotlight, star_avg, price_gte, price_lte } = Route.useSearch()
    const navigate = useNavigate({ from: Route.fullPath })

    const filters = {
        category,
        page,
        sort_by,
        sale,
        spotlight,
        star_avg,
        price_gte,
        price_lte
    }
    const { data: productsData, isPending: isProductsPending, error: productsError } = useProducts(filters);

    if (isProductsPending && !productsData) {
        return <div className='pt-18 text-center text-white'>CARREGANDO</div>
    }

    if (productsError) {
        return <div className='pt-18 text-center text-red-500'>ERROR</div>
    }

    const setSort = (newSort: string) => {
        navigate({
            search: (prev) => ({ ...prev, page: 1, sort_by: newSort }),
        })
    }

    const setSale = () => {
        navigate({
            search: (prev) => ({
                ...prev,
                page: 1,
                sale: prev.sale ? undefined : true
            }),
        })
    }

    const setSpotlight = () => {
        navigate({
            search: (prev) => ({
                ...prev,
                page: 1,
                spotlight: prev.spotlight ? undefined : true
            }),
        })
    }

    const increasePage = () => {
        navigate({
            search: (prev) => ({ ...prev, page: (prev.page ?? 1) + 1 }),
        })
    }

    const decreasePage = () => {
        navigate({
            search: (prev) => ({
                ...prev,
                page: Math.max((prev.page ?? 1) - 1, 1)
            }),
        })
    }

    return (
        <div className='pt-18'>
            <div className='flex w-full gap-3'>
                <button onClick={() => setSort('price-asc')}>price-asc</button>
                <button onClick={() => setSort('price-desc')}>price-desc</button>
                <button onClick={() => setSort('created-asc')}>created-asc</button>
                <button onClick={() => setSort('created-desc')}>created-desc</button>
                <button onClick={() => setSort('star_avg-asc')}>star_avg-asc</button>
                <button onClick={() => setSort('star_avg-desc')}>star_avg-desc</button>
            </div>
            <div className='flex w-full gap-3'>
                <button onClick={() => setSale()}>{(sale) ? 'Sale!' : "No Sale!"}</button>
                <button onClick={() => setSpotlight()}>{(spotlight) ? 'Spotlight!' : "No Spotlight!"}</button>
            </div>

            <h1>Sale: {sale ? 'true' : 'false'}</h1>
            <h1>Price_gte: {price_gte}</h1>
            <h1>Price_lte: {price_lte}</h1>
            <h1>Star_avg: {star_avg}</h1>

            <div className="my-4">
                {productsData.products.map((each) => (
                    <p key={each.id} className='text-black bg-app-purple'>
                        {each.title}: {each.price}: {each.stars}: {each.category}
                    </p>
                ))}
            </div>

            <div className="flex items-center gap-4">
                <p>
                    Página {productsData.page}: De {productsData.from} até {productsData.to} | Total: {productsData.total}
                </p>

                <button
                    onClick={decreasePage}
                    type="button"
                    disabled={page <= 1}
                    className="disabled:opacity-50"
                >
                    PÁGINA ANTERIOR
                </button>

                <button
                    onClick={increasePage}
                    type="button"
                    disabled={productsData.to >= productsData.total}
                    className="disabled:opacity-50"
                >
                    PRÓXIMA PÁGINA
                </button>
            </div>
        </div>
    )
}