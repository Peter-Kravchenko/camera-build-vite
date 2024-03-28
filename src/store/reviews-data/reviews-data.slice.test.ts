import { describe } from 'vitest';
import { RequestStatus } from '../../const';
import { makeFakeCamera, makeFakeReviews } from '../../utils/mocks';
import { fetchReviews } from '../api-actions';
import { reviewsData } from './reviews-data.slice';

describe('ReviewsData slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {
      type: '',
    };
    const expectedState = {
      reviews: [],
      fetchingStatus: RequestStatus.Idle,
    };

    const result = reviewsData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = {
      type: '',
    };
    const expectedState = {
      reviews: [],
      fetchingStatus: RequestStatus.Idle,
    };

    const result = reviewsData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "reviews" to array with review, fetchingStatus to success with "fetchReviews.fulfilled"', () => {
    const mockReviews = makeFakeReviews();
    const id = makeFakeCamera().id;
    const expectedState = {
      reviews: mockReviews,
      fetchingStatus: RequestStatus.Success,
    };

    const result = reviewsData.reducer(
      undefined,
      fetchReviews.fulfilled(mockReviews, '', id)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set fetchingStatus to rejected with "fetchReviews.rejected"', () => {
    const expectedState = {
      reviews: [],
      fetchingStatus: RequestStatus.Rejected,
    };

    const result = reviewsData.reducer(undefined, fetchReviews.rejected);

    expect(result).toEqual(expectedState);
  });
});
