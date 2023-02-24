export interface Product {
    id: number;
    name: string;
    weight: number;
}

export interface Link {
    group: string;
    product: Product;
    position: number;
}

export interface Result {
    group: string;
    name: string;
    weight: number;
}