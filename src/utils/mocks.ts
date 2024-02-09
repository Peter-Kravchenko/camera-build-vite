import { datatype, date, lorem, name, system } from 'faker';
import { Action } from 'redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { TAppState } from '../types/state';
import { createAPI } from '../services/api';
import { RequestStatus } from '../const';
import { TCamera, TCameras } from '../types/cameras';
import { TReviews } from '../types/reviews';
import { TPromos } from '../types/promos';

export type AppThunkDispatch = ThunkDispatch<
  TAppState,
  ReturnType<typeof createAPI>,
  Action
>;

export const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

const categorys = ['Видеокамера', 'Фотоаппарат'];
const types = ['Коллекционная', 'Моментальная', 'Цифровая', 'Плёночная'];
const levels = ['Любительский', 'Профессиональный', 'Нулевой'];

const getRandomArrayElement = <T>(array: T[]): T => {
  const index = datatype.number({ min: 0, max: array.length - 1 });
  return array[index];
};

export const makeFakeCamera = (): TCamera => ({
  id: datatype.number(),
  name: name.firstName(),
  vendorCode: datatype.uuid(),
  type: getRandomArrayElement(types) as TCamera['type'],
  category: getRandomArrayElement(categorys) as TCamera['category'],
  description: lorem.paragraph(),
  previewImg: system.filePath(),
  level: getRandomArrayElement(levels) as TCamera['level'],
  price: datatype.number({ min: 1, max: 1000000 }),
  previewImg2x: system.filePath(),
  previewImgWebp: system.filePath(),
  previewImgWebp2x: system.filePath(),
  rating: datatype.number({ min: 1, max: 5 }),
  reviewCount: datatype.number({ min: 0, max: 1000 }),
});

export const makeFakeCameras = (): TCameras =>
  Array.from({ length: 5 }).map(makeFakeCamera);

export const makeFakePromos = (): TPromos =>
  Array.from({ length: 3 }).map(() => ({
    id: datatype.number(),
    name: name.firstName(),
    previewImg: system.filePath(),
    previewImg2x: system.filePath(),
    previewImgWebp: system.filePath(),
    previewImgWebp2x: system.filePath(),
  }));

export const makeFakeReview = () => ({
  id: datatype.string(),
  createAt: date.recent().toString(),
  cameraId: datatype.number(),
  userName: name.firstName(),
  advantage: lorem.paragraph(),
  disadvantage: lorem.paragraph(),
  review: lorem.paragraph(),
  rating: datatype.number({ min: 1, max: 5 }),
});

export const makeFakeReviews = (): TReviews =>
  Array.from({ length: 5 }).map(makeFakeReview);

export const makeFakeStore = (
  initialState?: Partial<TAppState>
): TAppState => ({
  ADD_REVIEW: { fetchingStatus: RequestStatus.Idle },
  APP: { currentPage: 1, similarSliderIndex: 0, reviewsQtyOnPage: 3 },
  MODAL: {
    isModalAddToBasketOpen: false,
    isModalAddToBasketSuccessOpen: false,
    isModalAddReviewOpen: false,
    isModalAddReviewSuccessOpen: false,
  },
  CAMERAS: { cameras: [], fetchingStatus: RequestStatus.Idle },
  CAMERA: { camera: null, fetchingStatus: RequestStatus.Idle },
  PROMOS: { promos: [], fetchingStatus: RequestStatus.Idle },
  SIMILAR: { similar: [], fetchingStatus: RequestStatus.Idle },
  REVIEWS: { reviews: [], fetchingStatus: RequestStatus.Idle },
  ...(initialState ?? {}),
});
