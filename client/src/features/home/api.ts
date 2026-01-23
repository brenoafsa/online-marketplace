import api from "@/lib/http";

export interface Product {
    id: string;
    title: string;
    price: number;
    salePercentage: number | null;
    purchaseCount: number | null;
    onSpotlight: boolean;
    stars: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    type: "PHYSICAL" | "DIGITAL";
    category: "GAME" | "ASSET" | "COURSE" | "AUDIO" | "TEMPLATE" | "SOFTWARE" | "E-BOOK" | "VIDEO";
    creatorId: string;
}

export interface ProductsResponse {
  page: number,
  total: number,
  from: number,
  to: number,
  products: Product[]
}

export interface ProductCountResponse {
  category: "GAME" | "ASSET" | "COURSE" | "AUDIO" | "TEMPLATE" | "SOFTWARE" | "E-BOOK" | "VIDEO",
  count: number
}

export async function getProducts(): Promise<ProductsResponse> {
  const response = await api.get('/products?page=1&limit=20&sort=priceAsc');
  return response.data;
}

export async function getCategoryCount(): Promise<ProductCountResponse[]> {
  const response = await api.get('/products/category');
  return response.data;
}