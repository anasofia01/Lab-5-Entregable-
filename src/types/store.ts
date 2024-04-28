import { product } from './product';
import { shoppingCart } from './shoppingCart';

export type Observer = { render: () => void } & HTMLElement;

export type AppState = {
	productList: product[];
	shoppingCartList: shoppingCart[];
};

export enum ProductActions {
	'GET' = 'GET',
}

export enum ShoppingCartActions {
	'ADD' = 'ADD',
	'GET' = 'GET',
}

export interface GetProductAction {
	action: ProductActions.GET;
	payload: product[];
}

export interface GetShoppingCartAction {
	action: ShoppingCartActions.GET;
	payload: shoppingCart[];
}

export interface AddShoppingCartAction {
	action: ShoppingCartActions.ADD;
	payload: shoppingCart;
}

export type Actions = GetProductAction | GetShoppingCartAction | AddShoppingCartAction;
