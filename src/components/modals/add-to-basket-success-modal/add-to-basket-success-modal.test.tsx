import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-component';
import AddTobasketSuccessModal from './add-to-basket-success-modal';
import { makeFakeStore } from '../../../utils/mocks';

describe('Component: AddToBasketSuccessModal', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      <AddTobasketSuccessModal />,
      makeFakeStore()
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(
      screen.getByTestId('add-to-basket-modal-success')
    ).toBeInTheDocument();
  });
});
