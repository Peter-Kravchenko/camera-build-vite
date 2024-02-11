import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/index';
import { closeAddToBasketSuccessModal } from '../../../store/modal-process/modal-process.slice';
import { AppRoute } from '../../../const';
import useEscKey from '../../../hooks/use-esc-key/use-esc-key';

function AddToBasketSuccessModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const closeModal = () => {
    dispatch(closeAddToBasketSuccessModal());
  };

  useEscKey(closeModal);

  return (
    <div
      className="modal is-active modal--narrow"
      data-testid="add-to-basket-modal-success"
    >
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={closeModal} />
        <div className="modal__content">
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg
            className="modal__icon"
            width={86}
            height={80}
            aria-hidden="true"
          >
            <use xlinkHref="#icon-success" />
          </svg>
          <div className="modal__buttons">
            <a
              onClick={() => closeModal()}
              className="btn btn--transparent modal__btn"
            >
              Продолжить покупки
            </a>
            <button
              onClick={() => {
                dispatch(closeAddToBasketSuccessModal());
                navigate(AppRoute.Order);
              }}
              className="btn btn--purple modal__btn modal__btn--fit-width"
            >
              Перейти в корзину
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

export default AddToBasketSuccessModal;
