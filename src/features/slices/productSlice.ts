import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types/fetchTypes';

export interface IStoreProduct {
  products: Product[] | undefined;
  data: Product[] | undefined;
}

export const initialState: IStoreProduct = {
  products: (typeof window !== 'undefined' && JSON.parse(localStorage.getItem('products')!)) || [],
  data: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('data')!) : [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,

  selectors: {
    selectProducts: state => state.products,
    selectData: state => state.data,
  },

  reducers: {
    addData: (state, { payload }: PayloadAction<Product[]>) => {
      state.data = payload;
      localStorage.setItem('data', JSON.stringify(payload));
    },
    saveProduct: (state, { payload }: PayloadAction<Product>) => {
      if (state.products?.length === 0) {
        state.products.push(payload);
        localStorage.setItem('products', JSON.stringify(state.products));
      } else {
        const isExist = state.products?.some(item => item.id === payload.id);
        console.log(isExist);
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

export const { saveProduct, resetAllProduct, addData } = productSlice.actions;
export const { selectData, selectProducts } = productSlice.selectors;

export default productSlice.reducer;
