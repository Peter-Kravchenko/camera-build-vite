import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/index';
import useEscKey from '../../../hooks/use-esc-key/use-esc-key';
import { closeAddReviewSuccessModal } from '../../../store/modal-process/modal-process.slice';
import { AppRoute } from '../../../const';

function AddReviewSuccessModal() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const closeModal = () => {
    dispatch(closeAddReviewSuccessModal());
  };

  useEscKey(closeModal);

  return (
    <div className="modal is-active" data-testid="add-review-success-modal">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={closeModal} />
        <div className="modal__content">
          <p className="title title--h4">Спасибо за отзыв</p>
          <svg
            className="modal__icon"
            width={80}
            height={78}
            aria-hidden="true"
          >
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
      </div>
    </div>
  );
}

export default AddReviewSuccessModal;
