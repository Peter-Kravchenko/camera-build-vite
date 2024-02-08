import { useAppDispatch } from '../../hooks/index';
import { openAddToBasketModal } from '../../store/modal-process/modal-process.slice';
import { TCamera } from '../../types/cameras';
import { addSpaceInPrice } from '../../utils/utils';
import CameraRating from '../camera-rating/camera-rating';
import TabsData from '../tabs/tabs-data/tabs-data';

type CameraDetailsProps = {
  camera: TCamera;
};

function CameraDatails({ camera }: CameraDetailsProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="page-content__section">
      <section className="product">
        <div className="container">
          <div className="product__img">
            <picture>
              <source
                type="image/webp"
                srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x}`}
              />
              <img
                src={camera.previewImg}
                srcSet={camera.previewImg2x}
                width={560}
                height={480}
                alt={camera.name}
              />
            </picture>
          </div>
          <div className="product__content">
            <h1 className="title title--h3">{camera.name}</h1>
            <CameraRating
              rating={camera.rating}
              reviewCount={camera.reviewCount}
            />
            <p className="product__price">
              <span className="visually-hidden">Цена:</span>
              {addSpaceInPrice(camera.price)} ₽
            </p>
            <button
              onClick={() => dispatch(openAddToBasketModal())}
              className="btn btn--purple"
              type="button"
            >
              <svg width={24} height={16} aria-hidden="true">
                <use xlinkHref="#icon-add-basket" />
              </svg>
              Добавить в корзину
            </button>
            <TabsData camera={camera} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default CameraDatails;
