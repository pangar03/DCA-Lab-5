import styles from './product.css';

import { addToCart, navigate } from '../../store/actions';
import { addObserver, appState, dispatch } from '../../store/index'

export enum Attribute {
    'uid' = 'uid',
    'image' = 'image',
    'producttitle' = 'producttitle',
    'description' = 'description',
    'category' = 'category',
    'price' = 'price',
    'rating' = 'rating',
}

class ProductCard extends HTMLElement {
    uid?: number;
    image?: string;
    producttitle?: string;
    description?: string;
    category?: string; 
    price?: number;
    rating?: number;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.keys(Attribute);
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
        switch (propName){
            case Attribute.price:
                this[propName] = Number(newValue);
                break;

            case Attribute.rating:
                this[propName] = Number(newValue);
                break;
            
            case Attribute.uid:
                this[propName] = Number(newValue);
                break;

            default:
                this[propName] = newValue;
                break;
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
                <div class="product-card">
                    <div class="product-card__image" style="background-image: url('${this.image}')">
                    </div>
                    <div class="product-card__info">
                        <h2 class="product-card__info-title">${this.producttitle}</h2>
                        <p class="product-card__info-description">${this.description}</p>
                        <p class="product-card__info-category">${this.category}</p>
                        <p class="product-card__info-price">$${this.price}</p>
                        <p class="product-card__info-rating">Rating: ${this.rating}/5</p>
                    </div>
                    <button id='add-to-cart'>Add To Cart!</button>
                </div>
            `;
        }

        this.shadowRoot?.querySelector('#add-to-cart')?.addEventListener('click', () => {
            dispatch(addToCart({
                uid: this.uid || 0,
                image: this.image || '',
                producttitle: this.producttitle || '',
                price: this.price || 0,
            }));
            console.log(appState);
        });

        // CSS
        const cssProduct = document.createElement('style');
        cssProduct.innerHTML = styles;
        this.shadowRoot?.appendChild(cssProduct);
    }
}

customElements.define('product-card', ProductCard);
export default ProductCard;
