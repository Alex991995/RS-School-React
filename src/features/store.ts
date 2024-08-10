import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';

export const rootReducer = combineReducers({
  product: productReducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export default setupStore;
