import { createSelector } from '@reduxjs/toolkit';
import { TAppProcess, TAppState } from '../../types/state';
import { NameSpace } from '../../const';

export const getCurrentPage = createSelector(
  (state: Pick<TAppState, NameSpace.App>) => state[NameSpace.App],
  (state: TAppProcess) => state.currentPage
);

export const getSimilarSliderIndex = createSelector(
  (state: Pick<TAppState, NameSpace.App>) => state[NameSpace.App],
  (state: TAppProcess) => state.similarSliderIndex
);

export const getReviewsQtyOnPage = createSelector(
  (state: Pick<TAppState, NameSpace.App>) => state[NameSpace.App],
  (state: TAppProcess) => state.reviewsQtyOnPage
);

export const getSortByType = createSelector(
  (state: Pick<TAppState, NameSpace.App>) => state[NameSpace.App],
  (state: TAppProcess) => state.sortByType
);

export const getSortOrder = createSelector(
  (state: Pick<TAppState, NameSpace.App>) => state[NameSpace.App],
  (state: TAppProcess) => state.sortOrder
);

export const getActivePrice = createSelector(
  (state: Pick<TAppState, NameSpace.App>) => state[NameSpace.App],
  (state: TAppProcess) => state.activePrice
);

export const getActiveCategory = createSelector(
  (state: Pick<TAppState, NameSpace.App>) => state[NameSpace.App],
  (state: TAppProcess) => state.activeCategory
);

export const getActiveType = createSelector(
  (state: Pick<TAppState, NameSpace.App>) => state[NameSpace.App],
  (state: TAppProcess) => state.activeType
);

export const getActiveLevel = createSelector(
  (state: Pick<TAppState, NameSpace.App>) => state[NameSpace.App],
  (state: TAppProcess) => state.activeLevel
);
