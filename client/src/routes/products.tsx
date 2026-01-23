import { createFileRoute } from '@tanstack/react-router'
import { ProductListPage } from '@/features/product-list/components/ProductList'
import { productsSearchSchema } from '@/features/product-list/components/ProductList'

export const Route = createFileRoute('/products')({
  validateSearch: (search) => productsSearchSchema.parse(search),
  component: ProductListPage,
})