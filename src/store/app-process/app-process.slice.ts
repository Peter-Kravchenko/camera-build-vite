import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Category,
  DEFAULT_PAGE,
  DEFAULT_SLIDER_INDEX,
  Level,
  NameSpace,
  REVIEWS_ON_FIRST_LOAD,
  REVIEWS_ON_SHOW_MORE_CLICK,
  SortByType,
  SortOrder,
  Type,
} from '../../const';
import { TAppProcess } from '../../types/state';

const initialState: TAppProcess = {
  currentPage: DEFAULT_PAGE,
  similarSliderIndex: DEFAULT_SLIDER_INDEX,
  reviewsQtyOnPage: REVIEWS_ON_FIRST_LOAD,
  sortByType: null,
  sortOrder: null,
  activePrice: {
    min: 0,
    max: 1000000,
  },
  activeCategory: null,
  activeType: [],
  activeLevel: [],
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
      if (state.sortOrder === null) {
        state.sortOrder = SortOrder.Down;
      }
      state.sortByType = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<SortOrder>) => {
      if (state.sortByType === null) {
        state.sortByType = SortByType.Price;
      }
      state.sortOrder = action.payload;
    },
    setActivePrice: (
      state,
      action: PayloadAction<{ min: number; max: number }>
    ) => {
      state.activePrice = action.payload;
    },
    setActiveCategory: (state, action: PayloadAction<Category>) => {
      state.activeCategory = action.payload;
    },
    setActiveType: (state, action: PayloadAction<Type>) => {
      if (state.activeType.includes(action.payload)) {
        state.activeType = state.activeType.filter(
          (type) => type !== action.payload
        );
      } else {
        state.activeType = [...state.activeType, action.payload];
      }
    },
    setActiveLevel: (state, action: PayloadAction<Level>) => {
      if (state.activeLevel.includes(action.payload)) {
        state.activeLevel = state.activeLevel.filter(
          (level) => level !== action.payload
        );
      } else {
        state.activeLevel = [...state.activeLevel, action.payload];
      }
    },
    resetFilters: (state) => {
      state.activeCategory = null;
      state.activeType = [];
      state.activeLevel = [];
    },
    resetAppProcess: (state) => {
      state.currentPage = initialState.currentPage;
      state.similarSliderIndex = initialState.similarSliderIndex;
      state.reviewsQtyOnPage = initialState.reviewsQtyOnPage;
      state.sortByType = initialState.sortByType;
      state.sortOrder = initialState.sortOrder;
    },
  },
});

export const {
  setCurrentPage,
  setSimilarSliderIndex,
  showMoreReviews,
  setSortByType,
  setSortOrder,
  setActiveCategory,
  setActiveType,
  setActiveLevel,
  resetFilters,
  resetAppProcess,
} = appProcess.actions;
