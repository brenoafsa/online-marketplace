import api from "@/lib/http";
import z from "zod";

export const productsSearchSchema = z.object({
    category: z.enum([
        "game",
        "asset",
        "course",
        "audio",
        "template",
        "software",
        "e-book",
        "video"
    ]),
    page: z.number(),
    sort_by: z.string(),
    sale: z.boolean().optional(),
    spotlight: z.boolean().optional(),
    star_avg: z.number().refine((val) => [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5].includes(val), {
        message: "Invalid input. Star_avg must be incremented numbers of 0.5"
    }).optional(),
    price_gte: z.number().optional(),
    price_lte: z.number().optional()
})

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

export interface FiltersQuery {
    category: "game" | "asset" | "course" | "audio" | "template" | "software" | "e-book" | "video";
    page: number;
    sort_by: string;
    sale?: boolean;
    spotlight?: boolean;
    star_avg?: number;
    price_gte?: number;
    price_lte?: number;
}

export async function getProducts(data: FiltersQuery): Promise<ProductsResponse> {

    const filters = [
        (data.sale) ? `&sale=true` : "",
        (data.spotlight) ? `&spotlight=true` : "",
        (data.star_avg) ? `&star_avg=${data.star_avg}` : "",
        (data.price_gte) ? `&price_gte=${data.price_gte}` : "",
        (data.price_lte) ? `&price_lte=${data.price_lte}` : "",
    ].join('');

    const response = await api.get(`/products?category=${(data.category).toUpperCase()}&page=${data.page}&sort_by=${data.sort_by}${filters}`);
    return response.data;
}
