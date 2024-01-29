import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MAX_CAMERAS_ON_PAGE, NameSpace } from '../../const';
import { TAppProcess } from '../../types/state';

const initialState: TAppProcess = {
  currentPage: 1,
  perPage: MAX_CAMERAS_ON_PAGE,
  totalCount: 0,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = appProcess.actions;
