import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      const existItem = state.cartItems.find(
        (item) => item._id === newItem._id
      );

      if (existItem) {
        state.cartItems = state.cartItems.map((item) => {
          return item._id === existItem._id ? newItem : item;
        });
      } else {
        state.cartItems = [...state.cartItems, newItem];
      }

      // Calculation of items price
      state.itemsPrice = addDecimals(
        state.cartItems.reducer((acc, item) => acc + item.price * item.qty, 0)
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
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
