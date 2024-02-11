import {
  getCurrentPage,
  getReviewsQtyOnPage,
  getSimilarSliderIndex,
} from './app-process.selectors';
import { NameSpace } from '../../const';

describe('AppProcess selectors', () => {
  const state = {
    [NameSpace.App]: {
      currentPage: 1,
      similarSliderIndex: 0,
      reviewsQtyOnPage: 3,
    },
  };
  it('should return currentPage from state', () => {
    const { currentPage } = state[NameSpace.App];
    const result = getCurrentPage(state);
    expect(result).toEqual(currentPage);
  });
  it('should return similarSliderIndex from state', () => {
    const { similarSliderIndex } = state[NameSpace.App];
    const result = getSimilarSliderIndex(state);
    expect(result).toEqual(similarSliderIndex);
  });
  it('should return reviewsQtyOnPage from state', () => {
    const { reviewsQtyOnPage } = state[NameSpace.App];
    const result = getReviewsQtyOnPage(state);
    expect(result).toEqual(reviewsQtyOnPage);
  });
});
