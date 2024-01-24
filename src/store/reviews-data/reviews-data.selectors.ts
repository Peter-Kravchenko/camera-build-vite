import { createSelector } from '@reduxjs/toolkit';
import { TAppState, TReviewsData } from '../../types/state';
import { NameSpace } from '../../const';

export const getReviews = createSelector(
  (state: TAppState) => state[NameSpace.Reviews],
  (state: TReviewsData) => state.reviews
);

export const getReviewsFetchingStatus = createSelector(
  (state: TAppState) => state[NameSpace.Reviews],
  (state: TReviewsData) => state.fetchingStatus
);
