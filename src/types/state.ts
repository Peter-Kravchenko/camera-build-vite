import { RequestStatus } from '../const';
import store from '../store';
import { TCamera, TCameras } from './cameras';
import { TPromos } from './promo';
import { TReviews } from './reviews';

export type TAppDispatch = typeof store.dispatch;

export type TAppState = ReturnType<typeof store.getState>;

export type TAppProcess = {
  currentPage: number;
  similarSliderIndex: number;
  reviewsQtyOnPage: number;
};

export type TModalData = {
  isModalAddToBasketOpen: boolean;
  isModalAddToBasketSuccessOpen: boolean;
  isModalAddReviewOpen: boolean;
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
