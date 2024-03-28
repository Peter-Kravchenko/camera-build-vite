import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { makeFakeOrder, makeFakeStore } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';
import OrderCard from './order-card';

describe('Component: OrderCard', () => {
  it('should render correctly', () => {
    const mockOrder = makeFakeOrder();
    const mockStore = makeFakeStore();
    const { withStoreComponent } = withStore(
      <OrderCard order={mockOrder} />,
      mockStore
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('order-card')).toBeInTheDocument();
  });
});
