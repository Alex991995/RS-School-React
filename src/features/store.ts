import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/usersSlice';

export const rootReducer = combineReducers({
  user: userSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export default setupStore;
