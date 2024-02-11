import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-component';
import AddReviewSuccessModal from './add-review-success-modal';

describe('Component: AddToBasketSuccessModal', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<AddReviewSuccessModal />);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('add-review-success-modal')).toBeInTheDocument();
  });
});
