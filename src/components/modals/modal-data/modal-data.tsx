import cn from 'classnames';
import { useEffect, useRef } from 'react';
import useEscKey from '../../../hooks/use-esc-key';
import { resetModalStatus } from '../../../store/modal-process/modal-process.slice';
import { useAppDispatch, useAppSelector } from '../../../hooks/index';
import {
  checkAddReviewModalOpen,
  checkAddReviewSuccessModalOpen,
  checkAddToBasketModalOpen,
  checkAddToBasketSuccessModalOpen,
} from '../../../store/modal-process/modal-process.selectors';
import AddReviewModal from '../add-review-modal/add-review-modal';
import AddReviewSuccessModal from '../add-review-success-modal/add-review-success-modal';
import BasketActionModal from '../add-to-basket-modal/add-to-basket-modal';
import AddToBasketSuccessModal from '../add-to-basket-success-modal/add-to-basket-success-modal';
import useModalFocus from '../../../hooks/use-modal-focus';
import { BasketAction } from '../../../const';

function ModalData() {
  const dispatch = useAppDispatch();

  const isModalAddToBasketOpen = useAppSelector(checkAddToBasketModalOpen);
  const isModalAddToBasketSuccessOpen = useAppSelector(
    checkAddToBasketSuccessModalOpen
  );
  const isModalAddReviewOpen = useAppSelector(checkAddReviewModalOpen);
  const isModalAddReviewSuccessOpen = useAppSelector(
    checkAddReviewSuccessModalOpen
  );

  const closeModal = () => {
    dispatch(resetModalStatus());
  };
  const modalFocusRef = useRef<HTMLDivElement>(null);

  useEscKey(closeModal);

  useModalFocus(modalFocusRef);

  useEffect(() => {
    if (
      isModalAddReviewOpen ||
      isModalAddReviewSuccessOpen ||
      isModalAddToBasketOpen ||
      isModalAddToBasketSuccessOpen
    ) {
      document.body.className = 'scroll-lock';
    }
    return () => {
      document.body.className = '';
    };
  });

  return (
    <div
      ref={modalFocusRef}
      className={cn('modal is-active', {
        'modal--narrow': isModalAddReviewSuccessOpen,
      })}
      data-testid="modal-data"
    >
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={closeModal} />
        {isModalAddToBasketOpen && (
          <BasketActionModal basketAction={BasketAction.Add} />
        )}
        {isModalAddToBasketSuccessOpen && <AddToBasketSuccessModal />}
        {isModalAddReviewOpen && <AddReviewModal />}
        {isModalAddReviewSuccessOpen && <AddReviewSuccessModal />}
      </div>
    </div>
  );
}

export default ModalData;
