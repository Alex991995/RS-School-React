import { useDispatch } from 'react-redux';
import { productSlice } from '../features/slices/productSlice';
import { bindActionCreators } from '@reduxjs/toolkit';

const AllActions = {
  ...productSlice.actions,
};

const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(AllActions, dispatch);
};

export default useActions;
