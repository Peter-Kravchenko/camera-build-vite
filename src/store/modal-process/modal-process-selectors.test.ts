import { NameSpace } from '../../const';
import {
  getModalAddReviewOpen,
  getModalAddReviewSuccessOpen,
  getModalAddToBasketOpen,
  getModalAddToBasketSuccessOpen,
  getModalStatus,
} from './modal-process.selectors';

describe('ModalProcess selectors', () => {
  const state = {
    [NameSpace.Modal]: {
      isModalAddToBasketOpen: true,
      isModalAddToBasketSuccessOpen: true,
      isModalAddReviewOpen: true,
      isModalAddReviewSuccessOpen: true,
    },
  };
  it('should return isModalAddToBasketOpen', () => {
    const { isModalAddToBasketOpen } = state[NameSpace.Modal];
    const result = getModalAddToBasketOpen(state);
    expect(result).toEqual(isModalAddToBasketOpen);
  });
  it('should return isModalAddToBasketSuccessOpen', () => {
    const { isModalAddToBasketSuccessOpen } = state[NameSpace.Modal];
    const result = getModalAddToBasketSuccessOpen(state);
    expect(result).toEqual(isModalAddToBasketSuccessOpen);
  });
  it('should return isModalAddReviewOpen', () => {
    const { isModalAddReviewOpen } = state[NameSpace.Modal];
    const result = getModalAddReviewOpen(state);
    expect(result).toEqual(isModalAddReviewOpen);
  });
  it('should return isModalAddReviewSuccessOpen', () => {
    const { isModalAddReviewSuccessOpen } = state[NameSpace.Modal];
    const result = getModalAddReviewSuccessOpen(state);
    expect(result).toEqual(isModalAddReviewSuccessOpen);
  });
  it('should return modal status', () => {
    const {
      isModalAddToBasketOpen,
      isModalAddToBasketSuccessOpen,
      isModalAddReviewOpen,
      isModalAddReviewSuccessOpen,
    } = state[NameSpace.Modal];
    const result = getModalStatus(state);
    expect(result).toEqual({
      isModalAddToBasketOpen,
      isModalAddToBasketSuccessOpen,
      isModalAddReviewOpen,
      isModalAddReviewSuccessOpen,
    });
  });
});
