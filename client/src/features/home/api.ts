import api from "@/lib/http";

export interface ProductCountResponse {
  category: "GAME" | "ASSET" | "COURSE" | "AUDIO" | "TEMPLATE" | "SOFTWARE" | "E-BOOK" | "VIDEO",
  count: number
}

export async function getCategoryCount(): Promise<ProductCountResponse[]> {
  const response = await api.get('/products/category');
  return response.data;
}