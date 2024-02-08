import { NameSpace, RequestStatus } from '../../const';
import { getAddReviewFetchingStatus } from './add-review.selectors';

describe('AddReview selectors', () => {
  const state = {
    [NameSpace.AddReview]: {
      fetchingStatus: RequestStatus.Success,
    },
  };
  it('should return fetchingStatus', () => {
    const { fetchingStatus } = state[NameSpace.AddReview];
    const result = getAddReviewFetchingStatus(state);
    expect(result).toBe(fetchingStatus);
  });
});
