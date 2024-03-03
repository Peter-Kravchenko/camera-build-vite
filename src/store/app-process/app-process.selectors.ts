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

export const getSortType = createSelector(
  (state: Pick<TAppState, NameSpace.App>) => state[NameSpace.App],
  (state: TAppProcess) => state.sortType
);

export const getSortOrder = createSelector(
  (state: Pick<TAppState, NameSpace.App>) => state[NameSpace.App],
  (state: TAppProcess) => state.sortOrder
);

export const getActiveMinPrice = createSelector(
  (state: Pick<TAppState, NameSpace.App>) => state[NameSpace.App],
  (state: TAppProcess) => state.activeMinPrice
);

export const getActiveMaxPrice = createSelector(
  (state: Pick<TAppState, NameSpace.App>) => state[NameSpace.App],
  (state: TAppProcess) => state.activeMaxPrice
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
