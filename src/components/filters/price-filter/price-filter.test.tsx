import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-component';
import { makeFakeCameras, makeFakeStore } from '../../../utils/mocks';
import PriceFilter from './price-filter';
import { ValidationMap } from '../../../const';

describe('Component: PriceFilter', () => {
  it('should render correctly', () => {
    const mockStore = makeFakeStore();
    const mockCameras = makeFakeCameras();
    const { withStoreComponent } = withStore(
      <PriceFilter
        cameras={mockCameras}
        activeMinPrice={0}
        activeMaxPrice={0}
        isPriceValid={{ min: ValidationMap.Idle, max: ValidationMap.Idle }}
        setIsPriceValid={vi.fn()}
      />,
      mockStore
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Цена, ₽')).toBeInTheDocument();
  });
});
