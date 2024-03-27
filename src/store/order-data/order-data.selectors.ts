import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TAppState, TOrderData } from '../../types/state';
import { TOrder } from '../../types/orders';

export const getOrders = createSelector(
  (state: Pick<TAppState, NameSpace.Order>) => state[NameSpace.Order],
  (state: TOrderData) => state.orders
);

export const getCamerasIds = createSelector(
  (state: Pick<TAppState, NameSpace.Order>) => state[NameSpace.Order],
  (state: TOrderData) =>
    state.orders.flatMap((order) =>
      Array<TOrder['id']>(order.quantity).fill(order.id)
    )
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
