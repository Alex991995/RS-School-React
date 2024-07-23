import { configureStore } from '@reduxjs/toolkit';
import { productApi } from './slices/apiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import productReducer from './slices/productSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(productApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
