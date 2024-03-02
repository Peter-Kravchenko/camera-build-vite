import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeCameras } from '../../utils/mocks';
import Pagination from './pagination';
import { SortType, SortOrder } from '../../const';

describe('Component: Pagination', () => {
  it('should render correctly', () => {
    const mockCameras = makeFakeCameras();
    const { withStoreComponent } = withStore(
      <Pagination cameras={mockCameras} currentPage={1} />,
      {
        APP: {
          currentPage: 1,
          reviewsQtyOnPage: 3,
          similarSliderIndex: 0,
          sortType: SortType.ByPopularity,
          sortOrder: SortOrder.Down,
        },
      }
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});
