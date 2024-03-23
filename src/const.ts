export const BANNER_DELAY = 3000;
export const DEFAULT_PAGE = 1;
export const DEFAULT_SLIDER_INDEX = 0;
export const MAX_CAMERAS_ON_PAGE = 9;
export const PAGES_PER_ITERATION = 3;
export const TIMEOUT_DELAY = 300;
export const MAX_SIMILAR_CAMERAS_ON_PAGE = 3;
export const REVIEWS_ON_FIRST_LOAD = 3;
export const REVIEWS_ON_SHOW_MORE_CLICK = 3;
export const stars: number[] = [1, 2, 3, 4, 5];

export enum AppRoute {
  Catalog = '/',
  Login = '/login',
  Order = '/order',
  Product = '/product/:id',
  NotFound = '/404',
}

export enum APIRoute {
  AddReview = '/reviews',
  Camera = '/cameras/:id',
  Cameras = '/cameras',
  Coupons = '/coupons',
  Orders = '/orders',
  Promos = '/promo',
  Reviews = '/cameras/:id/reviews',
  Similar = '/cameras/:id/similar',
}

export enum NameSpace {
  AddReview = 'ADD_REVIEW',
  App = 'APP',
  Modal = 'MODAL',
  Camera = 'CAMERA',
  Cameras = 'CAMERAS',
  Coupons = 'COUPONS',
  Order = 'ORDER',
  Promos = 'PROMOS',
  Reviews = 'REVIEWS',
  Similar = 'SIMILAR',
}

export enum PageBlock {
  Catalog = 'catalog',
  Camera = 'camera',
  Order = 'order',
}

export enum RequestStatus {
  Idle = 'Idle',
  Pending = 'Pending',
  Success = 'Success',
  Rejected = 'Rejected',
}

export enum Coupons {
  camera333 = 'camera-333',
  camera444 = 'camera-444',
  camera555 = 'camera-555',
}

export enum Price {
  min = 'min',
  max = 'max',
}

export enum Type {
  Digital = 'Цифровая',
  Film = 'Плёночная',
  Instant = 'Моментальная',
  Collectors = 'Коллекционная',
}

export enum Category {
  Camera = 'Фотоаппарат',
  Camcorder = 'Видеокамера',
}

export enum Level {
  Zero = 'Нулевой',
  Amateur = 'Любительский',
  Professional = 'Профессиональный',
}

export enum Tab {
  Characteristics = 'chr',
  Description = 'dsc',
}

export enum SortType {
  ByPrice = 'price',
  ByPopularity = 'popular',
}

export enum SortOrder {
  Up = 'up',
  Down = 'down',
}

export enum CardType {
  Catalog = 'catalog',
  Details = 'details',
  Similar = 'similar',
}

export enum BasketAction {
  Add = 'add',
  Remove = 'remove',
}

export enum ValidationMap {
  Idle = 'idle',
  Error = 'is-invalid',
  Success = 'is-valid',
}

export const ratingMap: Record<string, string> = {
  '5': 'Отлично',
  '4': 'Хорошо',
  '3': 'Нормально',
  '2': 'Плохо',
  '1': 'Ужасно',
};

export const commonReviewConfig = {
  minLength: {
    value: 10,
    message: 'Минимум 10 символов',
  },
  maxLength: {
    value: 160,
    message: 'Максимум 160 символов',
  },
};
