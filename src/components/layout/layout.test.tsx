import { render, screen } from '@testing-library/react';
import Layout from './layout';
import { withHistory, withStore } from '../../utils/mock-component';

describe('Component: Layout', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<Layout />, {
      MODAL: {
        isModalAddReviewOpen: false,
        isModalAddReviewSuccessOpen: false,
        isModalAddToBasketOpen: false,
        isModalAddToBasketSuccessOpen: false,
      },
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });
});
