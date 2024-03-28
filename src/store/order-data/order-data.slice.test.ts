import { RequestStatus } from '../../const';
import { makeFakeCoupon, makeFakeDiscount } from '../../utils/mocks';
import { postCoupon, postOrder } from '../api-actions';
import { orderData } from './order-data.slice';

describe('OrderData slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {
      type: '',
    };
    const expectedState = {
      orders: [],
      coupon: null,
      orderFetchingStatus: RequestStatus.Idle,
      couponFetchingStatus: RequestStatus.Idle,
    };

    const result = orderData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = {
      type: '',
    };
    const expectedState = {
      orders: [],
      coupon: null,
      orderFetchingStatus: RequestStatus.Idle,
      couponFetchingStatus: RequestStatus.Idle,
    };

    const result = orderData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set postFetchingStatus to success with "postOrder.fulfilled"', () => {
    const expectedState = {
      orders: [],
      coupon: null,
      orderFetchingStatus: RequestStatus.Success,
      couponFetchingStatus: RequestStatus.Idle,
    };

    const result = orderData.reducer(undefined, postOrder.fulfilled);

    expect(result).toEqual(expectedState);
  });

  it('should set postFetchingStatus to rejected with "postOrder.rejected"', () => {
    const expectedState = {
      orders: [],
      coupon: null,
      orderFetchingStatus: RequestStatus.Rejected,
      couponFetchingStatus: RequestStatus.Idle,
    };

    const result = orderData.reducer(undefined, postOrder.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set couponFetchingStatus to success with "postCoupon.fulfilled"', () => {
    const mockCoupon = makeFakeCoupon();
    const mockDiscount = makeFakeDiscount();
    const expectedState = {
      orders: [],
      coupon: { coupon: mockCoupon, discount: mockDiscount },
      orderFetchingStatus: RequestStatus.Idle,
      couponFetchingStatus: RequestStatus.Success,
    };

    const result = orderData.reducer(
      undefined,
      postCoupon.fulfilled(
        { coupon: mockCoupon, discount: mockDiscount },
        '',
        mockCoupon
      )
    );

    expect(result).toEqual(expectedState);
  });

  it('should set couponFetchingStatus to rejected with "postCoupon.rejected"', () => {
    const expectedState = {
      orders: [],
      coupon: null,
      orderFetchingStatus: RequestStatus.Idle,
      couponFetchingStatus: RequestStatus.Rejected,
    };

    const result = orderData.reducer(undefined, postCoupon.rejected);

    expect(result).toEqual(expectedState);
  });
});
