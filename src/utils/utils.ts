import dayjs from 'dayjs';
import 'dayjs/locale/ru'; // Import the Russian locale
import { Category, SortByType, SortOrder, Tab, Type } from '../const';
import { TCamera, TCameras } from '../types/cameras';
import { TReview, TReviews } from '../types/reviews';

dayjs.locale('ru');

export const addSpaceInPrice = (price: number) =>
  price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export const convertFirstLetterToLowercase = (str: string) =>
  str[0].toLowerCase() + str.slice(1);

export const addCorrectEnding = (
  type: TCamera['type'],
  category: TCamera['category']
) => {
  if (category === Category.Camera) {
    if (
      type === Type.Instant ||
      type === Type.Collectors ||
      type === Type.Film
    ) {
      return `${type.slice(0, -2)}ый`;
    }

    if (type === Type.Digital) {
      return `${type.slice(0, -2)}ой`;
    }
  }

  return type;
};

export const createPages = (
  pages: number[],
  pagesCount: number,
  currentPage: number
) => {
  if (pagesCount > 3) {
    if (currentPage > 2) {
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
        if (i === pagesCount) {
          break;
        }
      }
    } else {
      for (let i = 1; i <= 3; i++) {
        pages.push(i);
        if (i === pagesCount) {
          break;
        }
      }
    }
  } else {
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
  }
};

export const getCamerasFromCurrentPage = (
  cameras: TCameras,
  currentPage: number,
  camerasOnPage: number
) =>
  cameras.slice((currentPage - 1) * camerasOnPage, currentPage * camerasOnPage);

export const getReviewDate = (date: TReview['createAt']): string =>
  dayjs(date).locale('ru').format('DD MMMM');

export const getReviewDateTime = (date: TReview['createAt']): string =>
  dayjs(date).format('YYYY-MM-DD');

export const getTabName = (tab: Tab) => {
  switch (tab) {
    case Tab.Characteristics:
      return 'Характеристики';
    case Tab.Description:
      return 'Описание';
  }
};

const sortReviewIncrease = (reviewA: TReview, reviewB: TReview) =>
  dayjs(reviewB.createAt).diff(reviewA.createAt);

const sortDecrease = (reviewA: TReview, reviewB: TReview) =>
  dayjs(reviewA.createAt).diff(reviewB.createAt);

export const sortReviewByDate = {
  increase: (reviews: TReviews) => [...reviews].sort(sortReviewIncrease),
  decreace: (reviews: TReviews) => [...reviews].sort(sortDecrease),
};

export const sortCamerasByPriceDecrease = (
  cameraA: TCamera,
  cameraB: TCamera
) => cameraB.price - cameraA.price;

export const sortCamerasByPriceIncrease = (
  cameraA: TCamera,
  cameraB: TCamera
) => cameraA.price - cameraB.price;

export const sortCamerasByPrice = {
  [SortOrder.Up]: (cameras: TCameras) =>
    [...cameras].sort(sortCamerasByPriceIncrease),
  [SortOrder.Down]: (cameras: TCameras) =>
    [...cameras].sort(sortCamerasByPriceDecrease),
};

export const sortCamerasByPopularityIncrease = (
  cameraA: TCamera,
  cameraB: TCamera
) => cameraB.rating - cameraA.rating;

export const sortCamerasByPopularityDecrease = (
  cameraA: TCamera,
  cameraB: TCamera
) => cameraA.rating - cameraB.rating;

export const sortCamerasByPopularity = {
  [SortOrder.Up]: (cameras: TCameras) =>
    [...cameras].sort(sortCamerasByPopularityIncrease),
  [SortOrder.Down]: (cameras: TCameras) =>
    [...cameras].sort(sortCamerasByPopularityDecrease),
};

export const getSortByTypeName = (sortType: SortByType) => {
  switch (sortType) {
    case SortByType.Price:
      return 'по цене';
    case SortByType.Popularity:
      return 'по популярности';
  }
};

export const getSortOrderName = (sortOrder: SortOrder) => {
  switch (sortOrder) {
    case SortOrder.Up:
      return 'По возростанию';
    case SortOrder.Down:
      return 'По убыванию';
  }
};
