import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TAppState, TOrderData } from '../../types/state';

export const getOrders = createSelector(
  (state: Pick<TAppState, NameSpace.Order>) => state[NameSpace.Order],
  (state: TOrderData) => state.orders
);

export const getCoupon = createSelector(
  (state: Pick<TAppState, NameSpace.Order>) => state[NameSpace.Order],
  (state: TOrderData) => state.coupon
);

export const getOrderFetchingStatus = createSelector(
  (state: Pick<TAppState, NameSpace.Order>) => state[NameSpace.Order],
  (state: TOrderData) => state.orderFetchingStatus
);

export const getCouponFetchingStatus = createSelector(
  (state: Pick<TAppState, NameSpace.Order>) => state[NameSpace.Order],
  (state: TOrderData) => state.couponFetchingStatus
);
