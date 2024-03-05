export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // Calculation of items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Calculation of shipping price (if order is over $100 then free, else $10)
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  // Calculation of tax price (15%)
  state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice).toFixed(2));

  // Calculation of total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.taxPrice) +
    Number(state.shippingPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
