import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RequestStatus } from '../../const';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeReview, makeFakeReviews } from '../../utils/mocks';
import ReviewCard from './review-card';

describe('Component: ReviewCard', () => {
  it('should render correctly', () => {
    const mockReview = makeFakeReview();
    const mockReviews = makeFakeReviews();
    const { withStoreComponent } = withStore(
      <ReviewCard review={mockReview} />,
      {
        REVIEWS: {
          reviews: mockReviews,
          fetchingStatus: RequestStatus.Success,
        },
      }
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('review-card')).toBeInTheDocument();
    expect(screen.getByText(mockReview.advantage)).toBeInTheDocument();
    expect(screen.getByText(mockReview.disadvantage)).toBeInTheDocument();
    expect(screen.getByText(mockReview.review)).toBeInTheDocument();
    expect(screen.getByText(mockReview.userName)).toBeInTheDocument();
  });
});
