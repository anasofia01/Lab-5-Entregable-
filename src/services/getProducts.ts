export const getProducts = async () => {
	try {
		const products = await fetch('https://fakestoreapi.com/products').then((res) => res.json());
		return products;
	} catch (error) {
		console.error(error);
	}
};
