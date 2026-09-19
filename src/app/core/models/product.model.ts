export type ProductCategory = 'pantalones' | 'camisetas' | 'chaquetas';

export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description?: string;
    category: ProductCategory;
    sizes: string[];
}