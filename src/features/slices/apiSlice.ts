import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../utils/constats';
import { ArrayProducts } from '../../types/fetchTypes';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: builder => ({
    getProduct: builder.query<ArrayProducts, { title: string; page: string }>({
      query: ({ title, page }) => `?title=${title}&offset=${page || '1'}&limit=10`,
    }),
  }),
});

export const useLazyGetProductQuery: () => [
  (arg: { title: string; page: string }) => void,
  {
    data?: ArrayProducts;
    isFetching: boolean;
  },
  { lastArg?: { title: string; page: string } },
] = productApi.endpoints.getProduct.useLazyQuery;
