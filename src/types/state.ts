import { RequestStatus } from '../const';
import store from '../store';
import { TCamera, TCameras } from './cameras';
import { TPromo } from './promo';
import { TReviews } from './reviews';

export type TAppDispatch = typeof store.dispatch;

export type TAppState = ReturnType<typeof store.getState>;

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

export type TPromoData = {
  promo: TPromo | null;
  fetchingStatus: RequestStatus;
};

export type TReviewsData = {
  reviews: TReviews;
  fetchingStatus: RequestStatus;
};