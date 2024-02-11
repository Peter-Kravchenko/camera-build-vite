import { render, screen } from '@testing-library/react';
import { makeFakeCameras } from '../../utils/mocks';
import CameraCard from './camera-card';
import { withHistory, withStore } from '../../utils/mock-component';

describe('Component: CameraCard', () => {
  it('should render correctly', () => {
    const mockCamera = makeFakeCameras()[0];
    const { withStoreComponent } = withStore(
      <CameraCard camera={mockCamera} />
    );
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId('camera-card')).toBeInTheDocument();
    expect(screen.getByText(mockCamera.name)).toBeInTheDocument();
  });
});
