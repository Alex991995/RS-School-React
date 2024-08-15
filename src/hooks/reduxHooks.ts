import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../features/store';
import { bindActionCreators } from '@reduxjs/toolkit';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

const AllActions = {
  // ...productSlice.actions,
};

const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(AllActions, dispatch);
};

export default useActions;
