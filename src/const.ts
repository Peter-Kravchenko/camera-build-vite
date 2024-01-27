export const BANNER_DELAY = 3000;

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
  App = 'APP',
  Modal = 'MODAL',
  Camera = 'CAMERA',
  Cameras = 'CAMERAS',
  Coupons = 'COUPONS',
  Orders = 'ORDERS',
  Promos = 'PROMOS',
  Reviews = 'REVIEWS',
  Similar = 'SIMILAR',
}

export enum RequestStatus {
  Idle = 'Idle',
  Pending = 'Pending',
  Success = 'Success',
  Rejected = 'Rejected',
}

export enum Coupon {
  camera333 = 'camera-333',
  camera444 = 'camera-444',
  camera555 = 'camera-555',
}

export enum Type {
  Collectors = 'Коллекционная',
  Instant = 'Моментальная',
  Digital = 'Цифровая',
  Film = 'Пленочная',
}

export enum Category {
  Camcorder = 'Видеокамера',
  Camera = 'Фотоаппарат',
}

export enum Level {
  Zero = 'Нулевой',
  Amateur = 'Любительский',
  Professional = 'Профессиональный',
}
