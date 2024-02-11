import { render, screen } from '@testing-library/react';
import { makeFakeCamera } from '../../utils/mocks';

import { withHistory, withStore } from '../../utils/mock-component';
import CameraDetails from './camera-details';

describe('Component: CameraDetails', () => {
  it('should render correctly', () => {
    const mockCamera = makeFakeCamera();
    const { withStoreComponent } = withStore(
      <CameraDetails camera={mockCamera} />
    );
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('camera-details')).toBeInTheDocument();
    expect(screen.getByText(mockCamera.name)).toBeInTheDocument();
  });
});
