import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Product, ArrayProducts } from '../../types/fetchTypes';

export interface IStoreProduct {
  products: ArrayProducts | undefined;
}

export const initialState: IStoreProduct = {
  products: JSON.parse(localStorage.getItem('products')!) || [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,

  selectors: {
    selectProducts: state => state.products,
  },

  reducers: {
    saveProduct: (state, { payload }: PayloadAction<Product>) => {
      if (state.products?.length === 0) {
        state.products.push(payload);
        localStorage.setItem('products', JSON.stringify(state.products));
      } else {
        const isExist = state.products?.some(item => item.id === payload.id);
        if (isExist) {
          state.products = state.products?.filter(item => item.id != payload.id);
        } else state.products?.push(payload);

        localStorage.setItem('products', JSON.stringify(state.products));
      }
    },
    resetAllProduct: state => {
      state.products = [];
      localStorage.setItem('products', JSON.stringify(state.products));
    },
  },
});

export const { selectProducts } = productSlice.selectors;
export const { saveProduct, resetAllProduct } = productSlice.actions;

export default productSlice.reducer;
