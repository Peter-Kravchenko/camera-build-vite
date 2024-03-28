import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-component';
import AddReviewModal from './add-review-modal';
import { makeFakeCamera } from '../../../utils/mocks';
import { RequestStatus } from '../../../const';

describe('Component: AddToBasketSuccessModal', () => {
  it('should render correctly', () => {
    const mockCamera = makeFakeCamera();
    const { withStoreComponent } = withStore(<AddReviewModal />, {
      ADD_REVIEW: { fetchingStatus: RequestStatus.Idle },
      CAMERA: {
        camera: mockCamera,
        fetchingStatus: RequestStatus.Success,
      },
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('add-review-modal')).toBeInTheDocument();
  });
});
