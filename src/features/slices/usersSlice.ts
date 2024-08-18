import { createSlice } from '@reduxjs/toolkit';
import { ObjFormType } from '../../utils/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { country_list } from '../../utils/constants';

interface userSliceTypes {
  arrayDataUsers: ObjFormType[];
  arrayCountry: string[];
}

const initialState: userSliceTypes = {
  arrayDataUsers: [],
  arrayCountry: country_list,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    selectAllData: state => state.arrayDataUsers,
    selectCountries: state => state.arrayCountry,
  },
  reducers: {
    addData: (state, { payload }: PayloadAction<ObjFormType>) => {
      state.arrayDataUsers.push(payload);
    },
  },
});

export const { addData } = userSlice.actions;

export const { selectAllData, selectCountries } = userSlice.selectors;

export default userSlice.reducer;
