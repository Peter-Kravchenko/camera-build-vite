import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeCameras } from '../../utils/mocks';

import CatalogCamerasList from './catalog-cameras-list';

describe('Component: CatalogCamerasList', () => {
  it('should render correctly', () => {
    const mockCameras = makeFakeCameras();
    const { withStoreComponent } = withStore(
      <CatalogCamerasList cameras={mockCameras} />
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('catalog-cameras-list')).toBeInTheDocument();
  });
});
