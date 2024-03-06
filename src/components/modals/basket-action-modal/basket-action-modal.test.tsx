import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-component';
import BasketActionModal from './basket-action-modal';
import { makeFakeCamera } from '../../../utils/mocks';
import { BasketAction, RequestStatus } from '../../../const';

describe('Component: BasketActionModal', () => {
  it('should render add to basket modal, when it is "add" prop', () => {
    const mockCamera = makeFakeCamera();
    const { withStoreComponent } = withStore(
      <BasketActionModal basketAction={BasketAction.Add} />,
      {
        MODAL: {
          isModalOpen: true,
          isModalAddToBasketOpen: true,
          isModalAddToBasketSuccessOpen: false,
          isModalAddReviewOpen: false,
          isModalAddReviewSuccessOpen: false,
          isModalRemoveFromBasketOpen: false,
        },
        CAMERA: {
          camera: mockCamera,
          fetchingStatus: RequestStatus.Success,
        },
      }
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('add-to-basket-modal')).toBeInTheDocument();
  });
  it('should render add to basket modal, when it is "remove" prop', () => {
    const mockCamera = makeFakeCamera();
    const { withStoreComponent } = withStore(
      <BasketActionModal basketAction={BasketAction.Remove} />,
      {
        MODAL: {
          isModalOpen: true,
          isModalAddToBasketOpen: true,
          isModalAddToBasketSuccessOpen: false,
          isModalAddReviewOpen: false,
          isModalAddReviewSuccessOpen: false,
          isModalRemoveFromBasketOpen: false,
        },
        CAMERA: {
          camera: mockCamera,
          fetchingStatus: RequestStatus.Success,
        },
      }
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('remove-from-basket-modal')).toBeInTheDocument();
  });
});
