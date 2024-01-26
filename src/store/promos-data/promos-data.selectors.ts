import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TAppState, TPromosData } from '../../types/state';

export const getPromos = createSelector(
  (state: TAppState) => state[NameSpace.Promos],
  (state: TPromosData) => state.promos
);

export const getPromosFetchingStatus = createSelector(
  (state: TAppState) => state[NameSpace.Promos],
  (state: TPromosData) => state.fetchingStatus
);
