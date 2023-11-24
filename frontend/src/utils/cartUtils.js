export const addDecimals = (number) => {
    return (Math.round(number * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
    //add items price
    state.itemsPrice = addDecimals(
        state.cartItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        )
    );

    //add shipping price (over $100 is free, or $10 for shipping)
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

    //add tax (15%)
    state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

    //add total price
    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2);

    localStorage.setItem("cart", JSON.stringify(state));

    return state;
};
