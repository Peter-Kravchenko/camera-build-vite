import { Coupon } from '../const';

export type TCoupon = (typeof Coupon)[keyof typeof Coupon] | string | null;

export type TCouponData = {
  coupon: TCoupon;
  discount: number;
};
