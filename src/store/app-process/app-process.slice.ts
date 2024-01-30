import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DEFAULT_PAGE,
  MAX_CAMERAS_ON_PAGE,
  NameSpace,
  REVIEWS_ON_FIRST_LOAD,
  REVIEWS_ON_SHOW_MORE_CLICK,
} from '../../const';
import { TAppProcess } from '../../types/state';

const initialState: TAppProcess = {
  currentPage: DEFAULT_PAGE,
  perPage: MAX_CAMERAS_ON_PAGE,
  totalCount: 0,
  reviewsQtyOnPage: REVIEWS_ON_FIRST_LOAD,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    showMoreReviews: (state) => {
      state.reviewsQtyOnPage += REVIEWS_ON_SHOW_MORE_CLICK;
    },
    resetAppProcess: (state) => {
      state.currentPage = DEFAULT_PAGE;
      state.reviewsQtyOnPage = REVIEWS_ON_FIRST_LOAD;
    },
  },
});

export const { setCurrentPage, showMoreReviews, resetAppProcess } =
  appProcess.actions;
