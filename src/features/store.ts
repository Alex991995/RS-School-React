import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';

export const rootReducer = combineReducers({
  product: productReducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
