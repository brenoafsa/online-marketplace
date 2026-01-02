export interface CreateProductDTO {
    title: string;
    price: number;
    salePercentage: number | null;
    type: 'PHYSICAL' | 'DIGITAL';
    category: 'GAME' | 'ASSET' | 'COURSE' | 'AUDIO' | 'TEMPLATE' | 'SOFTWARE' | 'E-BOOK' | 'VIDEO';
    creatorId: string;
}