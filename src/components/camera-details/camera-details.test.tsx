import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { makeFakeCamera, makeFakeStore } from '../../utils/mocks';

import { withHistory, withStore } from '../../utils/mock-component';
import CameraDetails from './camera-details';

describe('Component: CameraDetails', () => {
  it('should render correctly', () => {
    const mockStore = makeFakeStore();
    const mockCamera = makeFakeCamera();
    const { withStoreComponent } = withStore(
      <CameraDetails camera={mockCamera} />,
      mockStore
    );
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('camera-details')).toBeInTheDocument();
    expect(screen.getByText(mockCamera.name)).toBeInTheDocument();
  });
});
