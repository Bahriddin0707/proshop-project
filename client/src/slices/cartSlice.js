import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

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
      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => {
        return item._id !== action.payload._id;
      });
      return updateCart(state);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
