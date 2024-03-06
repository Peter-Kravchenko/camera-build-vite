import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Category,
  DEFAULT_PAGE,
  DEFAULT_SLIDER_INDEX,
  Level,
  NameSpace,
  REVIEWS_ON_FIRST_LOAD,
  REVIEWS_ON_SHOW_MORE_CLICK,
  SortType,
  SortOrder,
  Type,
} from '../../const';
import { TAppProcess, TMaxPrice, TMinPrice } from '../../types/state';

const initialState: TAppProcess = {
  currentPage: DEFAULT_PAGE,
  similarSliderIndex: DEFAULT_SLIDER_INDEX,
  reviewsQtyOnPage: REVIEWS_ON_FIRST_LOAD,
  sortType: null,
  sortOrder: null,
  activeMinPrice: 0,
  activeMaxPrice: 0,
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
    setSortByType: (state, action: PayloadAction<SortType>) => {
      if (state.sortOrder === null) {
        state.sortOrder = SortOrder.Down;
      }
      state.sortType = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<SortOrder>) => {
      if (state.sortType === null) {
        state.sortType = SortType.ByPrice;
      }
      state.sortOrder = action.payload;
    },
    setActiveMinPrice: (state, action: PayloadAction<TMinPrice>) => {
      state.activeMinPrice = action.payload;
    },
    setActiveMaxPrice: (state, action: PayloadAction<TMaxPrice>) => {
      state.activeMaxPrice = action.payload;
    },

    setActiveCategory: (state, action: PayloadAction<Category | null>) => {
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
      state.activeMinPrice = 0;
      state.activeMaxPrice = 0;
      state.activeCategory = null;
      state.activeType = [];
      state.activeLevel = [];
    },
    resetAppProcess: (state) => {
      state.currentPage = initialState.currentPage;
      state.similarSliderIndex = initialState.similarSliderIndex;
      state.reviewsQtyOnPage = initialState.reviewsQtyOnPage;
      state.sortType = initialState.sortType;
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
  setActiveMinPrice,
  setActiveMaxPrice,
  setActiveCategory,
  setActiveType,
  setActiveLevel,
  resetFilters,
  resetAppProcess,
} = appProcess.actions;
