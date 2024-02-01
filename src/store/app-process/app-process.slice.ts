import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DEFAULT_PAGE,
  DEFAULT_SLIDER_INDEX,
  NameSpace,
  REVIEWS_ON_FIRST_LOAD,
  REVIEWS_ON_SHOW_MORE_CLICK,
} from '../../const';
import { TAppProcess } from '../../types/state';

const initialState: TAppProcess = {
  currentPage: DEFAULT_PAGE,
  similarSliderIndex: DEFAULT_SLIDER_INDEX,
  reviewsQtyOnPage: REVIEWS_ON_FIRST_LOAD,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSimilarSliderIndex: (state, action: PayloadAction<number>) => {
      state.similarSliderIndex = action.payload;
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

export const {
  setCurrentPage,
  setSimilarSliderIndex,
  showMoreReviews,
  resetAppProcess,
} = appProcess.actions;
