import styles from './product.css';

export enum Attribute {
	'image' = 'image',
	'Title' = 'Title',
	'description' = 'description',
	'category' = 'category',
	'price' = 'price',
	'rating' = 'rating',
}

class ProductCard extends HTMLElement {
	image?: string;
	Title?: string;
	description?: string;
	category?: string;
	price?: number;
	rating?: string;

	static get observedAttributes() {
		const classAttribute: Record<Attribute, null> = {
			image: null,
			Title: null,
			description: null,
			category: null,
			price: null,
			rating: null,
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
        <span>${this.description}</span>
        <span>${this.category}</span>
        <span>${this.price}</span>
        <span>${this.rating}</span>
      </figure>
      `;
		}
		const cssMyComponent = this.ownerDocument.createElement('style');
		cssMyComponent.innerHTML = styles;
		this.shadowRoot?.appendChild(cssMyComponent);
	}
}

customElements.define('product-card', ProductCard);
export default ProductCard;
