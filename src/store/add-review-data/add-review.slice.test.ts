import { describe } from 'vitest';
import { RequestStatus } from '../../const';
import { addReview } from '../api-actions';
import { addReviewData, resetAddReviewFetchigStatus } from './add-review.slice';

describe('AddReview slice', () => {
  it('should reset fetchingStatus to idle with "resetAddReviewFetchigStatus"', () => {
    const initialState = {
      fetchingStatus: RequestStatus.Success,
    };
    const expectedState = {
      fetchingStatus: RequestStatus.Idle,
    };

    const result = addReviewData.reducer(
      initialState,
      resetAddReviewFetchigStatus()
    );

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action', () => {
    const emptyAction = {
      type: '',
    };
    const expectedState = {
      fetchingStatus: RequestStatus.Idle,
    };

    const result = addReviewData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = {
      type: '',
    };
    const expectedState = {
      fetchingStatus: RequestStatus.Idle,
    };

    const result = addReviewData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set fetchingStatus to success with "addReview.fulfilled"', () => {
    const expectedState = {
      fetchingStatus: RequestStatus.Success,
    };

    const result = addReviewData.reducer(undefined, addReview.fulfilled);

    expect(result).toEqual(expectedState);
  });

  it('should set fetchingStatus to rejected with "addReview.rejected"', () => {
    const expectedState = {
      fetchingStatus: RequestStatus.Rejected,
    };

    const result = addReviewData.reducer(undefined, addReview.rejected);

    expect(result).toEqual(expectedState);
  });
});
