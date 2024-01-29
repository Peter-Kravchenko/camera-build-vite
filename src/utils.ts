import { Category, Type } from './const';
import { TCamera } from './types/cameras';

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
