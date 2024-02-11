import { createSelector } from '@reduxjs/toolkit';
import { TAppState, TSimilarData } from '../../types/state';
import { NameSpace } from '../../const';

export const getSimilar = createSelector(
  (stase: Pick<TAppState, NameSpace.Similar>) => stase[NameSpace.Similar],
  (state: TSimilarData) => state.similar
);

export const getSimilarFetchingStatus = createSelector(
  (state: Pick<TAppState, NameSpace.Similar>) => state[NameSpace.Similar],
  (state: TSimilarData) => state.fetchingStatus
);
