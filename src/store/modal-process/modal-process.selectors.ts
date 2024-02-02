import { createSelector } from '@reduxjs/toolkit';
import { TAppState, TModalData } from '../../types/state';
import { NameSpace } from '../../const';

export const getModalAddToBasketOpen = createSelector(
  (state: TAppState) => state[NameSpace.Modal],
  (state: TModalData) => state.isModalAddToBasketOpen
);

export const getModalAddToBasketSuccessOpen = createSelector(
  (state: TAppState) => state[NameSpace.Modal],
  (state: TModalData) => state.isModalAddToBasketSuccessOpen
);

export const getModalAddReviewOpen = createSelector(
  (state: TAppState) => state[NameSpace.Modal],
  (state: TModalData) => state.isModalAddReviewOpen
);

export const getModalAddReviewSuccessOpen = createSelector(
  (state: TAppState) => state[NameSpace.Modal],
  (state: TModalData) => state.isModalAddReviewSuccessOpen
);
