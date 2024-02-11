import { createSelector } from '@reduxjs/toolkit';
import { TAddReviewData, TAppState } from '../../types/state';
import { NameSpace } from '../../const';

export const getAddReviewFetchingStatus = createSelector(
  (state: Pick<TAppState, NameSpace.AddReview>) => state[NameSpace.AddReview],
  (state: TAddReviewData) => state.fetchingStatus
);
