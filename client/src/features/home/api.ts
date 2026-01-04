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

export async function getProducts(): Promise<Product[]> {
  const response = await api.get('/products');
  return response.data;
}