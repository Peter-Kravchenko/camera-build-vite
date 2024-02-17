import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-component';
import BasketActionModal from './add-to-basket-modal';
import { makeFakeCamera } from '../../../utils/mocks';
import { RequestStatus } from '../../../const';

describe('Component: AddToBasketModal', () => {
  it('should render correctly', () => {
    const mockCamera = makeFakeCamera();
    const { withStoreComponent } = withStore(<BasketActionModal />, {
      MODAL: {
        isModalOpen: true,
        isModalAddToBasketOpen: true,
        isModalAddToBasketSuccessOpen: false,
        isModalAddReviewOpen: false,
        isModalAddReviewSuccessOpen: false,
      },
      CAMERA: {
        camera: mockCamera,
        fetchingStatus: RequestStatus.Success,
      },
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('add-to-basket-modal')).toBeInTheDocument();
  });
});
