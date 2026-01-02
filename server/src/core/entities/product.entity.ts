export class Product {
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

    constructor(props: {
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
    }) {
        this.id = props.id;
        this.title = props.title;
        this.price = props.price;
        this.salePercentage = props.salePercentage;
        this.purchaseCount = props.purchaseCount;
        this.onSpotlight = props.onSpotlight;
        this.stars = props.stars;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.type = props.type;
        this.category = props.category;
        this.creatorId = props.creatorId;
    }
}