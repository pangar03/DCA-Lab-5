import { getProducts } from "../services/getProducts";
import ProductCard, { Attribute as ProductCardAttribute } from "../components/product/product";
import '../components/product/product';

import ShoppingCartItem, { Attribute as CartProductAttribute } from "../components/product/product";
import '../components/shopppingCartItem/shoppingCartItem';

import { addToCart, getProductsRedux, navigate } from '../store/actions';
import { addObserver, appState, dispatch } from '../store/index'

import storage from "../utils/storage";

import styles from './dashboard.css';

class Dashboard extends HTMLElement {
    products: ProductCard[] = [];
    cartProducts: ShoppingCartItem[] = [];

    constructor()  {
        super();
        this.attachShadow({ mode: 'open' });
        
    }

    getProducts() {
        console.log('RENDER PRODUCTS');
        const data = appState.products;
        console.log('DATA', data);
        
        data.forEach((product: any) => {
            // console.log('product', product);
            
            const productCard = document.createElement('product-card') as ProductCard;
            productCard.setAttribute(ProductCardAttribute.uid, String(product.id));
            productCard.setAttribute(ProductCardAttribute.image, product.image);
            productCard.setAttribute(ProductCardAttribute.producttitle, product.title);
            productCard.setAttribute(ProductCardAttribute.description, product.description);
            productCard.setAttribute(ProductCardAttribute.category, product.category);
            productCard.setAttribute(ProductCardAttribute.price, product.price);
            productCard.setAttribute(ProductCardAttribute.rating, String(Math.floor(Math.random() * 5) + 1));
            this.products.push(productCard);
        });
        this.renderProducts();
    }

    getCartProducts() {
        const data = storage.get('STORE', appState);
        data.cart.forEach((product: any) => {
            const cartProduct = this.ownerDocument.createElement('shopping-cart-item') as ShoppingCartItem;
            cartProduct.setAttribute(CartProductAttribute.uid, String(product.uid));
            cartProduct.setAttribute(CartProductAttribute.image, product.image);
            cartProduct.setAttribute(CartProductAttribute.producttitle, product.producttitle);
            cartProduct.setAttribute(CartProductAttribute.price, String(product.price));

            this.cartProducts.push(cartProduct);
        });
    }

    async connectedCallback() {
        this.render();
        console.log('DASHBOARD CONNECTED'); 
        console.log('state', appState.products);    
        if(appState.products === undefined || appState.products.length === 0) { 
            const action = await getProductsRedux();
            dispatch(action);   
            console.log(action);
            console.log('appstate', appState.products);
            console.log('EJECUTANDO GETPRODUCTS');              
        }
        this.getProducts();
    }

    render() {
        this.getCartProducts();
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
                <section class="store-container">
                    <main class="products-container"></main>
                    <aside class="cart-container">
                        <h1>CART</h1>
                    </aside>
                </section>
            `;
        }

        const cartContainer = this.shadowRoot?.querySelector('.cart-container');
        this.cartProducts.forEach((product) => {
            cartContainer?.appendChild(product);
        });

        // CSS
        const cssDashboard = document.createElement('style');
        cssDashboard.innerHTML = styles;
        this.shadowRoot?.appendChild(cssDashboard);
    }

    renderProducts() {
        console.log('EJECUTANDO RENDER PRODUCTS');
        console.log('PRODUCTS A RENDER', this.products);
        
        
        const productsContainer = this.shadowRoot?.querySelector('.products-container');
        console.log('PRODUCTS CONTAINER', productsContainer);
        this.products.forEach((product) => {
            productsContainer?.appendChild(product);
        });
    }
}

customElements.define('dashboard-component', Dashboard);
