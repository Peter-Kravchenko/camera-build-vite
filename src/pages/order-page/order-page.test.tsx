import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';
import OrderPage from './order-page';
import { RequestStatus } from '../../const';

describe('Component: OrderPage', () => {
  it('should render correctly', () => {
    const mockStore = makeFakeStore();
    const { withStoreComponent } = withStore(<OrderPage />, mockStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('order-page')).toBeInTheDocument();
  });

  it('should render empty list, when orders length = 0', () => {
    const mockStore = makeFakeStore({
      ORDER: {
        orders: [],
        coupon: null,
        orderFetchingStatus: RequestStatus.Success,
        couponFetchingStatus: RequestStatus.Success,
      },
    });

    const { withStoreComponent } = withStore(<OrderPage />, mockStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Корзина пуста')).toBeInTheDocument();
  });
});
