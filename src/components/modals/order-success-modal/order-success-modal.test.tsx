import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-component';
import { makeFakeStore } from '../../../utils/mocks';
import OrderSuccessModal from './order-success-modal';

describe('Component: OrderSuccessModal', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      <OrderSuccessModal />,
      makeFakeStore()
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('order-success-modal')).toBeInTheDocument();
  });
});
