import { Link } from 'react-router-dom';
import { AppRoute, BasketAction, RequestStatus } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../../hooks/index';
import {
  getCamera,
  getCameraFetchingStatus,
} from '../../../store/camera-data/camera-data.selectors';
import {
  closeAddToBasketModal,
  openAddToBasketSuccessModal,
} from '../../../store/modal-process/modal-process.slice';
import {
  addCorrectEnding,
  addSpaceInPrice,
  convertFirstLetterToLowercase,
} from '../../../utils/utils';
import { toast } from 'react-toastify';
import Loader from '../../loader/loader';

type BasketActionModalProps = {
  basketAction: BasketAction;
};

function BasketActionModal({
  basketAction,
}: BasketActionModalProps): JSX.Element {
  const dispatch = useAppDispatch();

  const camera = useAppSelector(getCamera);
  const cameraFetchingStatus = useAppSelector(getCameraFetchingStatus);

  const closeModal = () => {
    dispatch(closeAddToBasketModal());
  };

  const openSuccessModal = () => {
    dispatch(openAddToBasketSuccessModal());
  };

  if (!camera || cameraFetchingStatus === RequestStatus.Pending) {
    return <Loader />;
  }

  return (
    <div className="modal__content">
      <p className="title title--h4">
        {basketAction === BasketAction.Add
          ? 'Добавить товар в корзину'
          : 'Удалить этот товар?'}
      </p>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <picture>
            <source
              type="image/webp"
              srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x}`}
            />
            <img
              src={camera.previewImg}
              srcSet={camera.previewImg2x}
              width={140}
              height={120}
              alt={camera.name}
            />
          </picture>
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title">{camera.name}</p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item">
              <span className="basket-item__article">Артикул:</span>{' '}
              <span className="basket-item__number">{camera.vendorCode}</span>
            </li>
            <li className="basket-item__list-item">
              {`${addCorrectEnding(
                camera.type,
                camera.category
              )} ${convertFirstLetterToLowercase(camera.category)} `}
            </li>
            <li className="basket-item__list-item">
              {`${camera?.level ?? ''} уровень`}
            </li>
          </ul>
          <p className="basket-item__price">
            <span className="visually-hidden">Цена:</span>
            {addSpaceInPrice(camera.price)} ₽
          </p>
        </div>
      </div>
      <div className="modal__buttons">
        {basketAction === BasketAction.Add ? (
          <button
            data-testid="add-to-basket-modal"
            autoFocus
            onClick={() => {
              closeModal();
              openSuccessModal();
            }}
            className="btn btn--purple modal__btn modal__btn--fit-width"
            type="button"
          >
            <svg width={24} height={16} aria-hidden="true">
              <use xlinkHref="#icon-add-basket" />
            </svg>
            Добавить в корзину
          </button>
        ) : (
          <>
            <button
              data-testid="remove-from-basket-modal"
              autoFocus
              onClick={() => {
                toast.info('Товар был удален из корзины.');
                closeModal();
              }}
              className="btn btn--purple modal__btn modal__btn--half-width"
              type="button"
            >
              Удалить
            </button>
            <Link
              to={AppRoute.Catalog}
              className="btn btn--transparent modal__btn modal__btn--half-width"
              onClick={() => {
                closeModal();
              }}
            >
              Продолжить покупки
            </Link>
          </>
        )}
      </div>
      <button
        onClick={() => {
          closeModal();
        }}
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

export default BasketActionModal;
