import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-component';
import AddTobasketSuccessModal from './add-to-basket-success-modal';

describe('Component: AddToBasketSuccessModal', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<AddTobasketSuccessModal />);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(
      screen.getByTestId('add-to-basket-modal-success')
    ).toBeInTheDocument();
  });
});
