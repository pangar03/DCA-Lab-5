import { CartItem, Product } from "./products";

export type AppState = {
    screen: string;
    cart: CartItem[];
    products: Product[];
};

export type Observer = { render: () => void } & HTMLElement;

export enum Actions {
    'ADDTOCART' = 'ADDTOCART',
    'NAVIGATION' = 'NAVIGATION',
    'GETPRODUCTS' = 'GETPRODUCTS',
    'GETCART' = 'GETCART',
}

export enum Screens {
    'DASHBOARD' = 'DASHBOARD',
}