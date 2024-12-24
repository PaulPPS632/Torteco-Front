import { Image } from "./image";

export interface Product {
    id: number;
    documentId: string;
    name: string;
    price: number;
    description: string;
    slug: string;
    images: Image[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;

}
