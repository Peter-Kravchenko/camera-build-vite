import { describe } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import {
  makeFakeCamera,
  makeFakeCameras,
  makeFakeReviews,
  makeFakeStore,
} from '../../utils/mocks';
import { RequestStatus } from '../../const';
import ProductPage from './product-page';

describe('Component: ProductPage', () => {
  it('should render correctly', () => {
    const mockCamera = makeFakeCamera();
    const mockSimilar = makeFakeCameras().slice(0, 3);
    const mockReviews = makeFakeReviews().slice(0, 3);
    const { withStoreComponent } = withStore(
      <ProductPage />,
      makeFakeStore({
        CAMERA: { camera: mockCamera, fetchingStatus: RequestStatus.Success },
        SIMILAR: {
          similar: mockSimilar,
          fetchingStatus: RequestStatus.Success,
        },
        REVIEWS: {
          reviews: mockReviews,
          fetchingStatus: RequestStatus.Success,
        },
      })
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('product-page')).toBeInTheDocument();
    waitFor(() => {
      expect(screen.getByText(mockCamera.name)).toBeInTheDocument();
      expect(screen.findByText(mockSimilar[0].name)).toBeInTheDocument();
      expect(screen.findByText(mockSimilar[1].name)).toBeInTheDocument();
      expect(screen.findByText(mockSimilar[2].name)).toBeInTheDocument();
      expect(screen.findByText(mockReviews[0].userName)).toBeInTheDocument();
      expect(screen.findByText(mockReviews[1].userName)).toBeInTheDocument();
      expect(screen.findByText(mockReviews[2].userName)).toBeInTheDocument();
    });
  });
  it('should not render similar if similar.length = 0', () => {
    const { withStoreComponent } = withStore(
      <ProductPage />,
      makeFakeStore({
        SIMILAR: {
          similar: [],
          fetchingStatus: RequestStatus.Success,
        },
      })
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.queryByText('Похожие камеры')).not.toBeInTheDocument();
  });
  it('should show "camera is not found" text, when camera is null', () => {
    const { withStoreComponent } = withStore(
      <ProductPage />,
      makeFakeStore({
        CAMERA: {
          camera: null,
          fetchingStatus: RequestStatus.Success,
        },
      })
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(
      screen.getByText(
        'Камера не найдена на сервере, пожалуйста, попробуйте ещё раз'
      )
    ).toBeInTheDocument();
  });
});
