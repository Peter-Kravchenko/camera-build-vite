import { createSelector } from '@reduxjs/toolkit';
import { TAppState, TModalData } from '../../types/state';
import { NameSpace } from '../../const';

export const getModalAddToBasketOpen = createSelector(
  (state: Pick<TAppState, NameSpace.Modal>) => state[NameSpace.Modal],
  (state: TModalData) => state.isModalAddToBasketOpen
);

export const getModalAddToBasketSuccessOpen = createSelector(
  (state: Pick<TAppState, NameSpace.Modal>) => state[NameSpace.Modal],
  (state: TModalData) => state.isModalAddToBasketSuccessOpen
);

export const getModalAddReviewOpen = createSelector(
  (state: Pick<TAppState, NameSpace.Modal>) => state[NameSpace.Modal],
  (state: TModalData) => state.isModalAddReviewOpen
);

export const getModalAddReviewSuccessOpen = createSelector(
  (state: Pick<TAppState, NameSpace.Modal>) => state[NameSpace.Modal],
  (state: TModalData) => state.isModalAddReviewSuccessOpen
);

export const getModalStatus = createSelector(
  (state: Pick<TAppState, NameSpace.Modal>) => state[NameSpace.Modal],
  (state: TModalData) => state
);
