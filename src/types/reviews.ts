import { TCamera } from './cameras';

export type TReview = {
  id: string;
  createAt: string;
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
};

export type TReviews = TReview[];

export type TAddReview = {
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
};

export type TAddReviewFormValues = {
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
};

export type TAddReviewFormData = {
  cameraId: TCamera['id'];
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
};
