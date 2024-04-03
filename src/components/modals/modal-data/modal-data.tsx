import cn from 'classnames';
import { useRef } from 'react';
import useEscKey from '../../../hooks/use-esc-key';
import { resetModalStatus } from '../../../store/modal-process/modal-process.slice';
import { useAppDispatch, useAppSelector } from '../../../hooks/index';
import {
  checkAddReviewModalOpen,
  checkAddReviewSuccessModalOpen,
  checkAddToBasketModalOpen,
  checkAddToBasketSuccessModalOpen,
  checkModalOpen,
  checkOrderSuccessModalOpen,
  checkRemoveFromBasketModalOpen,
} from '../../../store/modal-process/modal-process.selectors';
import AddReviewModal from '../add-review-modal/add-review-modal';
import AddReviewSuccessModal from '../add-review-success-modal/add-review-success-modal';
import BasketActionModal from '../basket-action-modal/basket-action-modal';
import AddToBasketSuccessModal from '../add-to-basket-success-modal/add-to-basket-success-modal';
import useModalFocus from '../../../hooks/use-modal-focus';
import { BasketAction } from '../../../const';
import useScrollLock from '../../../hooks/use-scroll-lock';
import OrderSuccessModal from '../order-success-modal/order-success-modal';

function ModalData() {
  const dispatch = useAppDispatch();
  const isModalAddToBasketOpen = useAppSelector(checkAddToBasketModalOpen);
  const isModalRemoveFromBasketOpen = useAppSelector(
    checkRemoveFromBasketModalOpen
  );
  const isModalAddToBasketSuccessOpen = useAppSelector(
    checkAddToBasketSuccessModalOpen
  );
  const isModalAddReviewOpen = useAppSelector(checkAddReviewModalOpen);
  const isModalAddReviewSuccessOpen = useAppSelector(
    checkAddReviewSuccessModalOpen
  );
  const isModalOrederSuccessOpen = useAppSelector(checkOrderSuccessModalOpen);
  const isAnyModalOpen = useAppSelector(checkModalOpen);
  const modalFocusRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    dispatch(resetModalStatus());
  };

  useEscKey(closeModal);
  useModalFocus(modalFocusRef);
  useScrollLock(isAnyModalOpen);

  return (
    <div
      ref={modalFocusRef}
      className={cn('modal is-active', {
        'modal--narrow':
          isModalAddReviewSuccessOpen || isModalAddToBasketSuccessOpen,
      })}
      data-testid="modal-data"
    >
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={closeModal} />
        {isModalAddToBasketOpen && (
          <BasketActionModal basketAction={BasketAction.Add} />
        )}
        {isModalRemoveFromBasketOpen && (
          <BasketActionModal basketAction={BasketAction.Remove} />
        )}
        {isModalAddToBasketSuccessOpen && <AddToBasketSuccessModal />}
        {isModalAddReviewOpen && <AddReviewModal />}
        {isModalAddReviewSuccessOpen && <AddReviewSuccessModal />}
        {isModalOrederSuccessOpen && <OrderSuccessModal />}
      </div>
    </div>
  );
}

export default ModalData;
