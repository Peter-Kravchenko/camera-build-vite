import { NameSpace } from '../../const';
import {
  checkAddReviewModalOpen,
  checkAddReviewSuccessModalOpen,
  checkAddToBasketModalOpen,
  checkAddToBasketSuccessModalOpen,
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
    const result = checkAddToBasketModalOpen(state);
    expect(result).toEqual(isModalAddToBasketOpen);
  });
  it('should return isModalAddToBasketSuccessOpen', () => {
    const { isModalAddToBasketSuccessOpen } = state[NameSpace.Modal];
    const result = checkAddToBasketSuccessModalOpen(state);
    expect(result).toEqual(isModalAddToBasketSuccessOpen);
  });
  it('should return isModalAddReviewOpen', () => {
    const { isModalAddReviewOpen } = state[NameSpace.Modal];
    const result = checkAddReviewModalOpen(state);
    expect(result).toEqual(isModalAddReviewOpen);
  });
  it('should return isModalAddReviewSuccessOpen', () => {
    const { isModalAddReviewSuccessOpen } = state[NameSpace.Modal];
    const result = checkAddReviewSuccessModalOpen(state);
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
