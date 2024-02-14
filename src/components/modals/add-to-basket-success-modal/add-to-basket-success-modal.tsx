import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/index';
import { closeAddToBasketSuccessModal } from '../../../store/modal-process/modal-process.slice';
import { AppRoute } from '../../../const';
import { useEffect, useRef } from 'react';
import { checkAddToBasketSuccessModalOpen } from '../../../store/modal-process/modal-process.selectors';

function AddToBasketSuccessModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isModalActive = useAppSelector(checkAddToBasketSuccessModalOpen);
  const modalRef = useRef<HTMLButtonElement>(null);

  const closeModal = () => {
    dispatch(closeAddToBasketSuccessModal());
  };

  useEffect(() => {
    if (isModalActive) {
      modalRef.current?.focus();
    }
  }, [isModalActive]);

  return (
    <div className="modal__content" data-testid="add-to-basket-modal-success">
      <p className="title title--h4">Товар успешно добавлен в корзину</p>
      <svg className="modal__icon" width={86} height={80} aria-hidden="true">
        <use xlinkHref="#icon-success" />
      </svg>
      <div className="modal__buttons">
        <button
          ref={modalRef}
          onClick={() => {
            closeModal();
            navigate(AppRoute.Catalog);
          }}
          className="btn btn--transparent modal__btn"
        >
          Продолжить покупки
        </button>
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
  );
}

export default AddToBasketSuccessModal;
