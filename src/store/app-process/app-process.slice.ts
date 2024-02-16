import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DEFAULT_PAGE,
  DEFAULT_SLIDER_INDEX,
  NameSpace,
  REVIEWS_ON_FIRST_LOAD,
  REVIEWS_ON_SHOW_MORE_CLICK,
  SortByType,
  SortOrder,
} from '../../const';
import { TAppProcess } from '../../types/state';

const initialState: TAppProcess = {
  currentPage: DEFAULT_PAGE,
  similarSliderIndex: DEFAULT_SLIDER_INDEX,
  reviewsQtyOnPage: REVIEWS_ON_FIRST_LOAD,
  sortByType: SortByType.Popularity,
  sortOrder: SortOrder.Down,
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
    setSortByType: (state, action: PayloadAction<SortByType>) => {
      state.sortByType = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<SortOrder>) => {
      state.sortOrder = action.payload;
    },
    resetAppProcess: (state) => {
      state.currentPage = DEFAULT_PAGE;
      state.similarSliderIndex = DEFAULT_SLIDER_INDEX;
      state.reviewsQtyOnPage = REVIEWS_ON_FIRST_LOAD;
      state.sortByType = SortByType.Popularity;
      state.sortOrder = SortOrder.Down;
    },
  },
});

export const {
  setCurrentPage,
  setSimilarSliderIndex,
  showMoreReviews,
  setSortByType,
  setSortOrder,
  resetAppProcess,
} = appProcess.actions;
