import dayjs from 'dayjs';
import 'dayjs/locale/ru'; // Import the Russian locale
import { Category, Type } from './const';
import { TCamera, TCameras } from './types/cameras';
import { TReview } from './types/reviews';

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
