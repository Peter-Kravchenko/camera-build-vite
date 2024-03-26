import { Coupons } from '../const';

export type TCoupon = (typeof Coupons)[keyof typeof Coupons] | string | null;

export type TCouponData = {
  coupon: TCoupon;
  discount: number;
};
