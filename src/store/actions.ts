import { CartItem } from '../types/products';
import { Actions } from '../types/store';
import { getProducts } from '../services/getProducts';

export const addToCart = (payload: CartItem) => {
    return {
        action: 'ADDTOCART',
        payload,
    }
}

export const navigate = (screen: string) => {
    return {
        action: 'NAVIGATION',
        payload: screen,
    };
};

export const getProductsRedux = async () => {
    const products = await getProducts();
    return {
        action: 'GETPRODUCTS',
        payload: products,
    };
};

export const getCart = () => {  
    return {
        action: 'GETCART',
    };
}