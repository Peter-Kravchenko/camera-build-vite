import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TAppState, TPromoData } from '../../types/state';

export const getPromo = createSelector(
  (state: TAppState) => state[NameSpace.Promo],
  (state: TPromoData) => state.promo
);

export const getPromoFetchingStatus = createSelector(
  (state: TAppState) => state[NameSpace.Promo],
  (state: TPromoData) => state.fetchingStatus
);
