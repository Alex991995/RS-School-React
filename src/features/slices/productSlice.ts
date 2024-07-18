import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Product } from '../../types/fetchTypes';

interface IStoreProduct {
  products: undefined | Product[];
}

const initialState: IStoreProduct = {
  products: undefined,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,

  reducers: {
    addProduct: (state, { payload }: PayloadAction<Product>) => {
      state.products?.filter(product => product.id !== payload.id);
    },
  },
});

export const { addProduct } = productSlice.actions;

export default productSlice.reducer;
