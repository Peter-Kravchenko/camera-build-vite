import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TAppState, TPromosData } from '../../types/state';

export const getPromos = createSelector(
  (state: Pick<TAppState, NameSpace.Promos>) => state[NameSpace.Promos],
  (state: TPromosData) => state.promos
);

export const getPromosFetchingStatus = createSelector(
  (state: Pick<TAppState, NameSpace.Promos>) => state[NameSpace.Promos],
  (state: TPromosData) => state.fetchingStatus
);
