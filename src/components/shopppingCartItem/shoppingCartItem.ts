import styles from './shoppingCartItem.css';

export enum Attribute {
    'uid' = 'uid',
    'image' = 'image',
    'producttitle' = 'producttitle',
    'price' = 'price',
}

class ShoppingCartItem extends HTMLElement {
    uid?: number;
    image?: string;
    producttitle?: string;
    price?: number;

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
                        <p class="product-card__info-price">$${this.price}</p>
                    </div>
                </div>
            `;
        }

        // CSS
        const cssProduct = document.createElement('style');
        cssProduct.innerHTML = styles;
        this.shadowRoot?.appendChild(cssProduct);
    }
}

customElements.define('shopping-cart-item', ShoppingCartItem);
export default ShoppingCartItem;
