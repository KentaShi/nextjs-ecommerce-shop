export const ACTIONS = {
    NOTIFY: "NOTIFY",
    AUTH: "AUTH",
    ADD_TO_CART: "ADD_TO_CART",
};

export const addToCart = (product, cart) => {
    if (product.inStock === 0) {
        return {
            type: "NOTIFY",
            payload: { error: "This product is out of stock" },
        };
    }

    const checkProductInCart = cart.find((item) => {
        return item._id === product._id;
    });

    if (checkProductInCart) {
        return {
            type: "ADD_TO_CART",
            payload: [...cart, { ...product, quantity: product.quantity + 1 }],
        };
    }
};
