import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeCameras, makeFakeStore } from '../../utils/mocks';

import CatalogCamerasList from './catalog-cameras-list';

describe('Component: CatalogCamerasList', () => {
  it('should render correctly', () => {
    const mockCameras = makeFakeCameras();
    const mockStore = makeFakeStore();
    const { withStoreComponent } = withStore(
      <CatalogCamerasList cameras={mockCameras} />,
      mockStore
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('catalog-cameras-list')).toBeInTheDocument();
  });
});
