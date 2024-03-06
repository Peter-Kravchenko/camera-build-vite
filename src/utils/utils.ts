import dayjs from 'dayjs';
import 'dayjs/locale/ru'; // Import the Russian locale
import { Category, Level, SortType, SortOrder, Tab, Type } from '../const';
import { TCamera, TCameras } from '../types/cameras';
import { TReview, TReviews } from '../types/reviews';
import { TMaxPrice, TMinPrice } from '../types/state';

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

export const getTabName = (tab: Tab) => {
  switch (tab) {
    case Tab.Characteristics:
      return 'Характеристики';
    case Tab.Description:
      return 'Описание';
  }
};

export const getCorrectFilterCategory = (category: Category) => {
  switch (category) {
    case Category.Camera:
      return 'Фотокамера';
    case Category.Camcorder:
      return 'Видеокамера';
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

const sortReviewIncrease = (reviewA: TReview, reviewB: TReview) =>
  dayjs(reviewB.createAt).diff(reviewA.createAt);

const sortDecrease = (reviewA: TReview, reviewB: TReview) =>
  dayjs(reviewA.createAt).diff(reviewB.createAt);

export const sortReviewByDate = {
  increase: (reviews: TReviews) => [...reviews].sort(sortReviewIncrease),
  decreace: (reviews: TReviews) => [...reviews].sort(sortDecrease),
};

const sortCamerasByPriceDecrease = (cameraA: TCamera, cameraB: TCamera) =>
  cameraB.price - cameraA.price;

const sortCamerasByPriceIncrease = (cameraA: TCamera, cameraB: TCamera) =>
  cameraA.price - cameraB.price;

const sortCamerasByPrice = {
  [SortOrder.Up]: (cameras: TCameras) =>
    [...cameras].sort(sortCamerasByPriceIncrease),
  [SortOrder.Down]: (cameras: TCameras) =>
    [...cameras].sort(sortCamerasByPriceDecrease),
};

const sortCamerasByPopularityDecrease = (cameraA: TCamera, cameraB: TCamera) =>
  cameraB.rating - cameraA.rating;

const sortCamerasByPopularityIncrease = (cameraA: TCamera, cameraB: TCamera) =>
  cameraA.rating - cameraB.rating;

const sortCamerasByPopularity = {
  [SortOrder.Up]: (cameras: TCameras) =>
    [...cameras].sort(sortCamerasByPopularityIncrease),
  [SortOrder.Down]: (cameras: TCameras) =>
    [...cameras].sort(sortCamerasByPopularityDecrease),
};

export const filterCamerasByParams = (
  cameras: TCameras,
  activeCategory: Category | null,
  activeType: Type[],
  activeLevel: Level[]
): TCameras => {
  let filteredCameras: TCameras = cameras;

  if (activeCategory) {
    filteredCameras = filteredCameras.filter(
      (camera) => camera.category === activeCategory
    );
  }
  if (activeType.length) {
    filteredCameras = filteredCameras.filter((camera) =>
      activeType.includes(camera.type)
    );
  }
  if (activeLevel.length) {
    filteredCameras = filteredCameras.filter((camera) =>
      activeLevel.includes(camera.level)
    );
  }

  return filteredCameras;
};

export const filterCamerasByPrice = (
  cameras: TCameras,
  activeMinPrice: TMinPrice | null,
  activeMaxPrice: TMaxPrice | null
): TCameras => {
  let filteredCameras: TCameras = cameras;

  if (activeMinPrice) {
    filteredCameras = filteredCameras.filter(
      (camera) => camera.price >= activeMinPrice
    );
  }
  if (activeMaxPrice) {
    filteredCameras = filteredCameras.filter(
      (camera) => camera.price <= activeMaxPrice
    );
  }

  return filteredCameras;
};

export const sortCameras = (
  cameras: TCameras,
  activeSortType: SortType | null,
  activeSortOrder: SortOrder | null
) => {
  let sortedCameras: TCameras = cameras;

  if (activeSortType && activeSortOrder) {
    if (activeSortType === SortType.ByPopularity) {
      sortedCameras = sortCamerasByPopularity[activeSortOrder](cameras);
    } else if (activeSortType === SortType.ByPrice) {
      sortedCameras = sortCamerasByPrice[activeSortOrder](cameras);
    }
  }

  return sortedCameras;
};

export const getSortByTypeName = (sortType: SortType) => {
  switch (sortType) {
    case SortType.ByPrice:
      return 'по цене';
    case SortType.ByPopularity:
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

export const searchCameras = (
  searchText: string,
  cameras: TCameras
): TCameras => {
  if (searchText === '') {
    return [];
  }
  return cameras.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );
};

export const getMinCamPrice = (
  catalogMinValue: number,
  minValue: number | null
) => {
  if (minValue === 0) {
    return 0;
  } else if (minValue && catalogMinValue > minValue) {
    return catalogMinValue;
  } else {
    return minValue;
  }
};
export const getMaxCamPrice = (
  catalogMaxValue: number,
  maxValue: number | null
) => {
  if (maxValue === 0) {
    return 0;
  } else if (maxValue && catalogMaxValue < maxValue) {
    return catalogMaxValue;
  } else {
    return maxValue;
  }
};

export const getCatalogMinValue = (cameras: TCameras) =>
  Math.min(...cameras.map((camera) => camera.price));

export const getCatalogMaxValue = (cameras: TCameras) =>
  Math.max(...cameras.map((camera) => camera.price));
