import styles from './dashboard.css';
import '../components/export';
import { addObserver, appState, dispatch } from '../store/index';
import { getProductList, getShoppingCart, addShoppingCartItem } from '../store/actions';
import { ProductCard, ShoppingCartItem } from '../components/export';
import { Attribute } from '../components/product/product';

class Dashboard extends HTMLElement {
	productCards?: ProductCard[] = [];
	shoppingCartCards?: ShoppingCartItem[] = [];

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	async connectedCallback() {
		if (appState.productList.length === 0) {
			const action = await getProductList();
			dispatch(action);
		} else {
			this.render();
		}
	}

	render() {
		if (this.shadowRoot) {
			const products = appState.productList;
			const promises = products.map((product: any) => {
				const productCard = this.ownerDocument.createElement('product-card') as ProductCard;
				productCard.setAttribute(Attribute.Title, product.title);
				productCard.setAttribute(Attribute.image, product.image);
				productCard.setAttribute(Attribute.description, product.description);
				productCard.setAttribute(Attribute.category, product.category);
				productCard.setAttribute(Attribute.price, product.price);
				productCard.setAttribute(Attribute.rating, product.rating);
				this.productCards?.push(productCard);
			});
			this.productCards?.forEach((component) => {
				this.shadowRoot?.appendChild(component);
			});
			const shoppingItems = appState.shoppingCartList;
			const promisesShoppingCart = shoppingItems.map((shoppingItem: any) => {
				const shoppingItemCard = this.ownerDocument.createElement('shopping-cart-item') as ShoppingCartItem;
				shoppingItemCard.setAttribute(Attribute.Title, shoppingItem.title);
				shoppingItemCard.setAttribute(Attribute.image, shoppingItem.image);
				shoppingItemCard.setAttribute(Attribute.price, shoppingItem.price);
				this.shoppingCartCards?.push(shoppingItemCard);
			});
			this.shoppingCartCards?.forEach((component) => {
				this.shadowRoot?.appendChild(component);
			});
		}

		const cssMyComponent = this.ownerDocument.createElement('style');
		cssMyComponent.innerHTML = styles;
		this.shadowRoot?.appendChild(cssMyComponent);
	}
}

customElements.define('app-dashboard', Dashboard);
export default Dashboard;
