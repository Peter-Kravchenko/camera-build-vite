import { SortByType, SortOrder } from '../../const';
import { makeFakeRandomNumber } from '../../utils/mocks';
import {
  appProcess,
  resetAppProcess,
  setCurrentPage,
  setSimilarSliderIndex,
  showMoreReviews,
} from './app-process.slice';

describe('AppProcess slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {
      type: '',
    };
    const expectedState = {
      currentPage: 1,
      similarSliderIndex: 0,
      reviewsQtyOnPage: 3,
      sortByType: SortByType.Popularity,
      sortOrder: SortOrder.Down,
    };

    const result = appProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = {
      type: '',
    };
    const expectedState = {
      currentPage: 1,
      similarSliderIndex: 0,
      reviewsQtyOnPage: 3,
      sortByType: SortByType.Popularity,
      sortOrder: SortOrder.Down,
    };

    const result = appProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set currentPage value with "setCurrentPage" action', () => {
    const mockCurrentPage = makeFakeRandomNumber();
    const initialState = {
      currentPage: 1,
      similarSliderIndex: 0,
      reviewsQtyOnPage: 3,
      sortByType: SortByType.Popularity,
      sortOrder: SortOrder.Down,
    };
    const expectedState = {
      currentPage: mockCurrentPage,
      similarSliderIndex: 0,
      reviewsQtyOnPage: 3,
      sortByType: SortByType.Popularity,
      sortOrder: SortOrder.Down,
    };

    const result = appProcess.reducer(
      initialState,
      setCurrentPage(mockCurrentPage)
    );

    expect(result.currentPage).toEqual(expectedState.currentPage);
  });

  it('should set similarSliderIndex value with "setSimilarSliderIndex" action', () => {
    const mockSimilarSliderIndex = makeFakeRandomNumber();
    const initialState = {
      currentPage: 1,
      similarSliderIndex: 0,
      reviewsQtyOnPage: 3,
      sortByType: SortByType.Popularity,
      sortOrder: SortOrder.Down,
    };
    const expectedState = {
      currentPage: 1,
      similarSliderIndex: mockSimilarSliderIndex,
      reviewsQtyOnPage: 3,
      sortByType: SortByType.Popularity,
      sortOrder: SortOrder.Down,
    };

    const result = appProcess.reducer(
      initialState,
      setSimilarSliderIndex(mockSimilarSliderIndex)
    );

    expect(result.similarSliderIndex).toEqual(expectedState.similarSliderIndex);
  });

  it('should increase reviewsQtyOnPage by 3 with "setReviewsQtyOnPage" action', () => {
    const mockReviewsQtyOnPage = makeFakeRandomNumber();
    const initialState = {
      currentPage: 1,
      similarSliderIndex: 0,
      reviewsQtyOnPage: mockReviewsQtyOnPage,
      sortByType: SortByType.Popularity,
      sortOrder: SortOrder.Down,
    };
    const expectedReviewsQtyOnPage = mockReviewsQtyOnPage + 3;

    const result = appProcess.reducer(initialState, showMoreReviews());

    expect(result.reviewsQtyOnPage).toBe(expectedReviewsQtyOnPage);
  });

  it('should reset state with "resetAppProcess" action', () => {
    const initialState = {
      currentPage: 10,
      similarSliderIndex: 5,
      reviewsQtyOnPage: 12,
      sortByType: SortByType.Price,
      sortOrder: SortOrder.Up,
    };
    const expectedState = {
      currentPage: 1,
      similarSliderIndex: 0,
      reviewsQtyOnPage: 3,
      sortByType: SortByType.Popularity,
      sortOrder: SortOrder.Down,
    };

    const result = appProcess.reducer(initialState, resetAppProcess());

    expect(result).toEqual(expectedState);
  });
});
