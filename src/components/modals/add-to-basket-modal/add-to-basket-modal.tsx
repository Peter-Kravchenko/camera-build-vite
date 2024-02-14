import { useEffect, useRef } from 'react';
import { RequestStatus } from '../../../const';
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
import { checkAddToBasketModalOpen } from '../../../store/modal-process/modal-process.selectors';

function AddToBasketModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const isModalActive = useAppSelector(checkAddToBasketModalOpen);
  const modalRef = useRef<HTMLButtonElement>(null);

  const camera = useAppSelector(getCamera);
  const cameraFetchingStatus = useAppSelector(getCameraFetchingStatus);

  const closeModal = () => {
    dispatch(closeAddToBasketModal());
  };

  const openSuccessModal = () => {
    dispatch(openAddToBasketSuccessModal());
  };

  useEffect(() => {
    if (isModalActive && cameraFetchingStatus === RequestStatus.Success) {
      modalRef.current?.focus();
    }
  }, [isModalActive, cameraFetchingStatus]);

  if (!camera || cameraFetchingStatus === RequestStatus.Pending) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="modal__content" data-testid="add-to-basket-modal">
      <p className="title title--h4">Добавить товар в корзину</p>
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
        <button
          ref={modalRef}
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

export default AddToBasketModal;
