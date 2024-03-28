import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakePromos, makeFakeStore } from '../../utils/mocks';
import { RequestStatus } from '../../const';
import Banner from './banner';

describe('Component: Banner', () => {
  it('should render correctly', () => {
    const mockPromos = makeFakePromos();
    const mockStore = makeFakeStore({
      PROMOS: { promos: mockPromos, fetchingStatus: RequestStatus.Success },
    });
    const { withStoreComponent } = withStore(
      <Banner promos={mockPromos} />,
      mockStore
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    const banner = screen.getByTestId('banner');

    expect(banner).toBeInTheDocument();
  });
});
