import { Coupons } from '../const';
import { TCamera } from './cameras';

export type TOrders = {
  camerasIds: TCamera['id'][];
  coupon: Coupons | string;
};
