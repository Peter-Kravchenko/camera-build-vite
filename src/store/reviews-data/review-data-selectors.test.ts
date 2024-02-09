import { NameSpace, RequestStatus } from '../../const';
import { makeFakeReviews } from '../../utils/mocks';
import { getReviews, getReviewsFetchingStatus } from './reviews-data.selectors';

describe('ReviewsData selectors', () => {
  const mockReviews = makeFakeReviews();
  const state = {
    [NameSpace.Reviews]: {
      reviews: mockReviews,
      fetchingStatus: RequestStatus.Success,
    },
  };
  it('should return reviews from state', () => {
    const { reviews } = state[NameSpace.Reviews];
    const result = getReviews(state);
    expect(result).toEqual(reviews);
  });
  it('should return fetchingStatus from state', () => {
    const { fetchingStatus } = state[NameSpace.Reviews];
    const result = getReviewsFetchingStatus(state);
    expect(result).toEqual(fetchingStatus);
  });
});
