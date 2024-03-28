import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { makeFakeOrders, makeFakeStore } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';
import OrderDetails from './order-details';

describe('Component: OrderDetails', () => {
  it('should render correcrtly', () => {
    const mockOrders = makeFakeOrders();
    const mockStore = makeFakeStore();
    const { withStoreComponent } = withStore(
      <OrderDetails orders={mockOrders} />,
      mockStore
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('order-details')).toBeInTheDocument();
  });
});
