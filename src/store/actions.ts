import {
	ProductActions,
	ShoppingCartActions,
	GetProductAction,
	GetShoppingCartAction,
	AddShoppingCartAction,
} from '../types/store';

import { getProducts } from '../services/getProducts';

export const getProductList = async (): Promise<GetProductAction> => {
	const products = await getProducts();
	return {
		action: ProductActions.GET,
		payload: products,
	};
};

export const addShoppingCartItem = ({ payload }: Pick<AddShoppingCartAction, 'payload'>): AddShoppingCartAction => {
	return {
		action: ShoppingCartActions.ADD,
		payload,
	};
};

export const getShoppingCart = ({ payload }: Pick<GetShoppingCartAction, 'payload'>): GetShoppingCartAction => {
	return {
		action: ShoppingCartActions.GET,
		payload,
	};
};
