import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../utils/constants';
import { ArrayProducts, Product } from '../../types/fetchTypes';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: builder => ({
    getProduct: builder.query<ArrayProducts, { title: string; page: string }>({
      query: ({ title, page }) => `?title=${title}&offset=${page || '1'}&limit=10`,
    }),
    getSingleProduct: builder.query<Product, string>({
      query: id => id,
    }),
  }),
});
