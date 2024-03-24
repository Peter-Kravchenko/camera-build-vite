import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-component';
import AddReviewSuccessModal from './order-success-modal';
import { makeFakeStore } from '../../../utils/mocks';

describe('Component: AddToBasketSuccessModal', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      <AddReviewSuccessModal />,
      makeFakeStore()
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('add-review-success-modal')).toBeInTheDocument();
  });
});
