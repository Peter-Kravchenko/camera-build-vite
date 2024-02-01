import { createSelector } from '@reduxjs/toolkit';
import { TAppProcess, TAppState } from '../../types/state';
import { NameSpace } from '../../const';

export const getCurrentPage = createSelector(
  (state: TAppState) => state[NameSpace.App],
  (state: TAppProcess) => state.currentPage
);

export const getSimilarSliderIndex = createSelector(
  (state: TAppState) => state[NameSpace.App],
  (state: TAppProcess) => state.similarSliderIndex
);

export const getReviewsQtyOnPage = createSelector(
  (state: TAppState) => state[NameSpace.App],
  (state: TAppProcess) => state.reviewsQtyOnPage
);
