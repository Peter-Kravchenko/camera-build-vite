import { Coupons } from '../const';
import { TCamera } from './cameras';

export type TOrder = TCamera & {
  quantity: number;
};

export type TOrders = TOrder[];

export type TOrderData = {
  camerasIds: TCamera['id'][];
  coupon: Coupons | string;
};
