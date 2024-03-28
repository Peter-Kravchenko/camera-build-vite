import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeOrders, makeFakeStore } from '../../utils/mocks';
import OrderList from './order-list';

describe('Component: OrderList', () => {
  it('should render correctly', () => {
    const mockOrders = makeFakeOrders();
    const mockStore = makeFakeStore();
    const { withStoreComponent } = withStore(
      <OrderList orders={mockOrders} />,
      mockStore
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('order-list')).toBeInTheDocument();
  });
});
