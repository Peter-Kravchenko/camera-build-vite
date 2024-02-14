import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/index';
import useEscKey from '../../../hooks/use-esc-key';
import { closeAddReviewSuccessModal } from '../../../store/modal-process/modal-process.slice';
import { AppRoute } from '../../../const';
import useModalFocus from '../../../hooks/use-modal-focus';

function AddReviewSuccessModal() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const closeModal = () => {
    dispatch(closeAddReviewSuccessModal());
  };

  const modalFocusRef = useRef<HTMLDivElement>(null);

  useModalFocus(modalFocusRef);

  useEscKey(closeModal);

  return (
    <div
      ref={modalFocusRef}
      className="modal__content"
      data-testid="add-review-success-modal"
    >
      <p className="title title--h4">Спасибо за отзыв</p>
      <svg className="modal__icon" width={80} height={78} aria-hidden="true">
        <use xlinkHref="#icon-review-success" />
      </svg>
      <div className="modal__buttons">
        <button
          autoFocus
          onClick={() => {
            closeModal();
            navigate(AppRoute.Catalog);
          }}
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
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
