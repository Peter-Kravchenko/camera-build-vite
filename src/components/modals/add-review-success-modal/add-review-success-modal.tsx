import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/index';
import useEscKey from '../../../hooks/use-esc-key';
import { closeAddReviewSuccessModal } from '../../../store/modal-process/modal-process.slice';
import { AppRoute, RequestStatus } from '../../../const';
import { useEffect, useRef } from 'react';
import { checkAddReviewSuccessModalOpen } from '../../../store/modal-process/modal-process.selectors';
import { getAddReviewFetchingStatus } from '../../../store/add-review-data/add-review.selectors';

function AddReviewSuccessModal() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addReviewFetchingStatus = useAppSelector(getAddReviewFetchingStatus);

  const isModalActive = useAppSelector(checkAddReviewSuccessModalOpen);
  const modalRef = useRef<HTMLButtonElement>(null);

  const closeModal = () => {
    dispatch(closeAddReviewSuccessModal());
  };

  useEscKey(closeModal);

  useEffect(() => {
    if (isModalActive && addReviewFetchingStatus === RequestStatus.Success) {
      modalRef.current?.focus();
    }
  }, [isModalActive, addReviewFetchingStatus]);

  return (
    <div className="modal__content" data-testid="add-review-success-modal">
      <p className="title title--h4">Спасибо за отзыв</p>
      <svg className="modal__icon" width={80} height={78} aria-hidden="true">
        <use xlinkHref="#icon-review-success" />
      </svg>
      <div className="modal__buttons">
        <button
          onClick={() => {
            closeModal();
            navigate(AppRoute.Catalog);
          }}
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
          ref={modalRef}
        >
          Вернуться к покупкам
        </button>
      </div>
      <button
        onClick={() => closeModal()}
        className="cross-btn"
        type="button"
        aria-label="Закрыть попап"
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </div>
  );
}

export default AddReviewSuccessModal;
