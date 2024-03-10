import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-component';
import { makeFakeCameras, makeFakeStore } from '../../../utils/mocks';
import FiltersData from './filters-data';

describe('Component: Filters', () => {
  it('should render correctly', () => {
    const mockStore = makeFakeStore();
    const mockCameras = makeFakeCameras();
    const { withStoreComponent } = withStore(
      <FiltersData
        cameras={mockCameras}
        activeMinPrice={0}
        activeMaxPrice={0}
        activeFilterCategory={null}
        activeFilterType={[]}
        activeFilterLevel={[]}
      />,
      mockStore
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('filters')).toBeInTheDocument();
  });
});
