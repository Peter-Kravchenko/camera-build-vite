import useEscKey from '../../../hooks/use-esc-key/use-esc-key';
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
import AddToBasketModal from '../add-to-basket-modal/add-to-basket-modal';
import cn from 'classnames';
import AddToBasketSuccessModal from '../add-to-basket-success-modal/add-to-basket-success-modal';
import { useEffect } from 'react';

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

  const closeModal = () => {
    dispatch(resetModalStatus());
  };

  useEscKey(closeModal);

  return (
    <div
      className={cn('modal is-active', {
        'modal--narrow': isModalAddReviewSuccessOpen,
      })}
      data-testid="modal-data"
    >
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={closeModal} />
        {isModalAddToBasketOpen && <AddToBasketModal />}
        {isModalAddToBasketSuccessOpen && <AddToBasketSuccessModal />}
        {isModalAddReviewOpen && <AddReviewModal />}
        {isModalAddReviewSuccessOpen && <AddReviewSuccessModal />}
      </div>
    </div>
  );
}

export default ModalData;
