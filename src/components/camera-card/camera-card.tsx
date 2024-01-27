import { Link } from 'react-router-dom';
import { TCamera } from '../../types/cameras';
import { addSpaceInPrice } from '../../utils';
import { AppRoute } from '../../const';
import CamearaRating from '../camera-rating/camera-rating';
import { useAppDispatch } from '../../hooks/index';
import { openAddToBasketModal } from '../../store/modal-process/modal-process.slice';
import { fetchCamera } from '../../store/api-actions';

type CameraCardProps = {
  camera: TCamera;
};

function CameraCard({ camera }: CameraCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x}`}
          />
          <img
            src={camera.previewImg}
            srcSet={camera.previewImg2x}
            width={280}
            height={240}
            alt={camera.name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <CamearaRating
          rating={camera.rating}
          reviewCount={camera.reviewCount}
        />
        <p className="product-card__title">{camera.name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {addSpaceInPrice(camera.price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          onClick={() => {
            dispatch(fetchCamera(Number(camera.id)));
            dispatch(openAddToBasketModal());
          }}
          className="btn btn--purple product-card__btn"
          type="button"
        >
          Купить
        </button>
        <Link
          to={AppRoute.Product.replace(':id', String(camera.id))}
          className="btn btn--transparent"
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export default CameraCard;
