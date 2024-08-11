import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import { createWrapper } from 'next-redux-wrapper';

export const rootReducer = combineReducers({
  product: productReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export const makeStore = () => {
  const store = setupStore();
  return store;
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export const wrapper = createWrapper<AppStore>(makeStore);
export default setupStore;
