import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeReviews, makeFakeStore } from '../../utils/mocks';
import ReviewsList from './reviews-list';
import { RequestStatus } from '../../const';

describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    const mockReviews = makeFakeReviews();
    const { withStoreComponent } = withStore(
      <ReviewsList reviews={mockReviews} />,
      makeFakeStore()
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('reviews-list')).toBeInTheDocument();
  });

  it('should render empty list, when reviews length = 0', () => {
    const { withStoreComponent } = withStore(
      <ReviewsList reviews={[]} />,
      makeFakeStore({
        REVIEWS: { reviews: [], fetchingStatus: RequestStatus.Success },
      })
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(
      screen.getByText('Отзывы по данному товару отсутствуют')
    ).toBeInTheDocument();
  });

  it('should nor render show more button if reviews.length =< reviewsQtyOnPage', () => {
    const mockReviews = makeFakeReviews().slice(0, 3);
    const { withStoreComponent } = withStore(<ReviewsList reviews={[]} />, {
      REVIEWS: {
        reviews: mockReviews,
        fetchingStatus: RequestStatus.Success,
      },
      APP: {
        currentPage: 1,
        reviewsQtyOnPage: 3,
        similarSliderIndex: 0,
        sortType: null,
        sortOrder: null,
        activeMinPrice: 0,
        activeMaxPrice: 0,
        activeCategory: null,
        activeType: [],
        activeLevel: [],
      },
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(
      screen.queryByText('Показать больше отзывов')
    ).not.toBeInTheDocument();
  });
});
