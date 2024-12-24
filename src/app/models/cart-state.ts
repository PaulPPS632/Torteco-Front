import { Product } from "./product";

export interface CartState {
    product: Product;
    quantity: number;
    total: number;
}
