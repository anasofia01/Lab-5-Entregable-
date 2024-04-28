import {
	ProductActions,
	ShoppingCartActions,
	GetProductAction,
	GetShoppingCartAction,
	AddShoppingCartAction,
	Actions,
	AppState,
} from '../types/store';

import { getProductList, addShoppingCartItem, getShoppingCart } from './actions';

export const reducer = (currentAction: Actions, currentState: AppState): AppState => {
	const { action, payload } = currentAction;
	switch (action) {
		case ProductActions.GET:
			return {
				...currentState,
				productList: payload,
			};
		case ShoppingCartActions.ADD:
			return {
				...currentState,
				shoppingCartList: [payload, ...currentState.shoppingCartList],
			};
		case ShoppingCartActions.GET:
			return {
				...currentState,
				shoppingCartList: payload,
			};
		default:
			return currentState;
	}
};
