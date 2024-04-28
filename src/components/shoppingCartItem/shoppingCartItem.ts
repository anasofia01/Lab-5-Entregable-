import styles from './shoppingCartItem.css';

export enum Attribute {
	'image' = 'image',
	'Title' = 'Title',
	'price' = 'price',
}

class ShoppingCartItem extends HTMLElement {
	image?: string;
	Title?: string;
	price?: number;

	static get observedAttributes() {
		const classAttribute: Record<Attribute, null> = {
			image: null,
			Title: null,
			price: null,
		};
		return Object.keys(classAttribute);
	}

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			case Attribute.price:
				if (newValue) {
					this.price = Number(newValue);
				} else {
					this.price = undefined;
				}

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
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
      <figure>
        <h2>${this.Title}</h2>
        <div class = "frame">
          <img src = "${this.image}"/>
        </div>
        <span>${this.price}</span>
      </figure>
      `;
		}
		const cssMyComponent = this.ownerDocument.createElement('style');
		cssMyComponent.innerHTML = styles;
		this.shadowRoot?.appendChild(cssMyComponent);
	}
}

customElements.define('shopping-cart-item', ShoppingCartItem);
export default ShoppingCartItem;
