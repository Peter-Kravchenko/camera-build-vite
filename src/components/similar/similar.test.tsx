import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import Similar from './similar';
import { makeFakeCameras } from '../../utils/mocks';

describe('Component: Similar', () => {
  it('should render correctly', () => {
    const mockSimilar = makeFakeCameras();
    const { withStoreComponent } = withStore(
      <Similar similar={mockSimilar} />,
      {
        APP: {
          similarSliderIndex: 0,
          currentPage: 1,
          reviewsQtyOnPage: 3,
        },
      }
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('similar')).toBeInTheDocument();
  });
});
