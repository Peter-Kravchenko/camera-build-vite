import {
  Category,
  Level,
  RequestStatus,
  SortType,
  SortOrder,
  Type,
} from '../const';
import store from '../store';
import { TCamera, TCameras } from './cameras';
import { TCouponData } from './coupons';
import { TOrders } from './orders';
import { TPromos } from './promos';
import { TReviews } from './reviews';

export type TAppDispatch = typeof store.dispatch;

export type TAppState = ReturnType<typeof store.getState>;

export type TAppProcess = {
  currentPage: number;
  similarSliderIndex: number;
  reviewsQtyOnPage: number;
  sortType: SortType | null;
  sortOrder: SortOrder | null;
  activeMinPrice: TMinPrice;
  activeMaxPrice: TMaxPrice;
  activeCategory: Category | null;
  activeType: Type[];
  activeLevel: Level[];
};

export type TModalData = {
  isModalOpen: boolean;
  isModalAddToBasketOpen: boolean;
  isModalAddToBasketSuccessOpen: boolean;
  isModalAddReviewOpen: boolean;
  isModalAddReviewSuccessOpen: boolean;
  isModalOrderSuccessOpen: boolean;
  isModalRemoveFromBasketOpen: boolean;
};

export type TCamerasData = {
  cameras: TCameras;
  fetchingStatus: RequestStatus;
};

export type TCameraData = {
  camera: TCamera | null;
  fetchingStatus: RequestStatus;
};

export type TSimilarData = {
  similar: TCameras;
  fetchingStatus: RequestStatus;
};

export type TPromosData = {
  promos: TPromos;
  fetchingStatus: RequestStatus;
};

export type TReviewsData = {
  reviews: TReviews;
  fetchingStatus: RequestStatus;
};

export type TAddReviewData = {
  fetchingStatus: RequestStatus;
};

export type TMinPrice = number;
export type TMaxPrice = number;

export type TOrderData = {
  orders: TOrders;
  coupon: TCouponData | null;
  couponFetchingStatus: RequestStatus;
  orderFetchingStatus: RequestStatus;
};
