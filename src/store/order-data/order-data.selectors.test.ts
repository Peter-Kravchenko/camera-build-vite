import { describe } from 'vitest';
import {
  makeFakeCoupon,
  makeFakeDiscount,
  makeFakeOrders,
} from '../../utils/mocks';
import { NameSpace, RequestStatus } from '../../const';
import {
  getCoupon,
  getCouponFetchingStatus,
  getOrderFetchingStatus,
  getOrders,
} from './order-data.selectors';

describe('OrderData selectors', () => {
  const mockOrders = makeFakeOrders();
  const mockCoupon = makeFakeCoupon();
  const mockDiscount = makeFakeDiscount();
  const state = {
    [NameSpace.Order]: {
      orders: mockOrders,
      coupon: { coupon: mockCoupon, discount: mockDiscount },
      orderFetchingStatus: RequestStatus.Success,
      couponFetchingStatus: RequestStatus.Success,
    },
  };
  it('should return orders from state', () => {
    const { orders } = state[NameSpace.Order];
    const result = getOrders(state);
    expect(result).toEqual(orders);
  });
  it('should return coupon from state', () => {
    const { coupon } = state[NameSpace.Order];
    const result = getCoupon(state);
    expect(result).toEqual(coupon);
  });
  it('should return orderFetchingStatus from state', () => {
    const { orderFetchingStatus } = state[NameSpace.Order];
    const result = getOrderFetchingStatus(state);
    expect(result).toEqual(orderFetchingStatus);
  });
  it('should return couponFetchingStatus from state', () => {
    const { couponFetchingStatus } = state[NameSpace.Order];
    const result = getCouponFetchingStatus(state);
    expect(result).toEqual(couponFetchingStatus);
  });
});
