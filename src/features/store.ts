import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productApi } from './slices/apiSlice';
import productReducer from './slices/productSlice';

export const rootReducer = combineReducers({
  product: productReducer,
  [productApi.reducerPath]: productApi.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(productApi.middleware),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export default setupStore;
