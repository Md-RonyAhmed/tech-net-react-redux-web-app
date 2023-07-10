/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IProduct } from '@/types/globalTypes';
import { createSlice } from '@reduxjs/toolkit';

interface ICart {
  products: IProduct[];
  total: number;
}

const initialState: ICart = {
  products: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.quantity! += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      state.total += action.payload.price;
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
