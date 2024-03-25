import { TCamera } from './cameras';
import { TCoupon } from './coupons';

export type TOrder = TCamera & {
  quantity: number;
};

export type TOrders = TOrder[];

export type TOrderData = {
  camerasIds: TCamera['id'][];
  coupon: TCoupon;
};
