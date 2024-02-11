import { render, screen } from '@testing-library/react';
import CameraRating from './camera-rating';

describe('Component: CameraRating', () => {
  it('should render correctly', () => {
    const mockRating = 5;
    const mockReviewCount = 10;
    const preparedComponent = (
      <CameraRating rating={mockRating} reviewCount={mockReviewCount} />
    );
    render(preparedComponent);

    expect(screen.getByTestId('camera-rating')).toBeInTheDocument();
    expect(screen.getByText(`Рейтинг: ${mockRating}`)).toBeInTheDocument();
    expect(screen.getByText(mockReviewCount)).toBeInTheDocument();
  });
});
