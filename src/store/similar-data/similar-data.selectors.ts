import { createSelector } from '@reduxjs/toolkit';
import { TAppState, TSimilarData } from '../../types/state';
import { NameSpace } from '../../const';

export const getSimilar = createSelector(
  (stase: TAppState) => stase[NameSpace.Similar],
  (state: TSimilarData) => state.similar
);

export const getSimilarFetchingStatus = createSelector(
  (state: TAppState) => state[NameSpace.Similar],
  (state: TSimilarData) => state.fetchingStatus
);
