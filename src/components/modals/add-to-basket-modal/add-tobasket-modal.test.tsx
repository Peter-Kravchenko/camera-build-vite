import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-component';
import AddTobasketModal from './add-tobasket-modal';
import { makeFakeCamera } from '../../../utils/mocks';
import { RequestStatus } from '../../../const';

describe('Component: AddToBasketModal', () => {
  it('should render correctly', () => {
    const mockCamera = makeFakeCamera();
    const { withStoreComponent } = withStore(<AddTobasketModal />, {
      MODAL: {
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
