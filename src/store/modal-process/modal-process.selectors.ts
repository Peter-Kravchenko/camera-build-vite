import { createSelector } from '@reduxjs/toolkit';
import { TAppState, TModalData } from '../../types/state';
import { NameSpace } from '../../const';

export const checkAddToBasketModalOpen = createSelector(
  (state: Pick<TAppState, NameSpace.Modal>) => state[NameSpace.Modal],
  (state: TModalData) => state.isModalAddToBasketOpen
);

export const checkAddToBasketSuccessModalOpen = createSelector(
  (state: Pick<TAppState, NameSpace.Modal>) => state[NameSpace.Modal],
  (state: TModalData) => state.isModalAddToBasketSuccessOpen
);

export const checkAddReviewModalOpen = createSelector(
  (state: Pick<TAppState, NameSpace.Modal>) => state[NameSpace.Modal],
  (state: TModalData) => state.isModalAddReviewOpen
);

export const checkAddReviewSuccessModalOpen = createSelector(
  (state: Pick<TAppState, NameSpace.Modal>) => state[NameSpace.Modal],
  (state: TModalData) => state.isModalAddReviewSuccessOpen
);

export const checkModalOpen = createSelector(
  (state: Pick<TAppState, NameSpace.Modal>) => state[NameSpace.Modal],
  (state: TModalData) => state.isModalOpen
);

export const checkOrderSuccessModalOpen = createSelector(
  (state: Pick<TAppState, NameSpace.Modal>) => state[NameSpace.Modal],
  (state: TModalData) => state.isModalOrderSuccessOpen
);

export const checkRemoveFromBasketModalOpen = createSelector(
  (state: Pick<TAppState, NameSpace.Modal>) => state[NameSpace.Modal],
  (state: TModalData) => state.isModalRemoveFromBasketOpen
);
