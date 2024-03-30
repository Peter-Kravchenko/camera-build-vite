import { CardType } from '../../const';
import { TCamera } from '../../types/cameras';
import { addSpaceInPrice } from '../../utils/utils';
import AddToBasketButton from '../buttons/add-to-basket-button/add-to-basket-button';
import CameraRating from '../camera-rating/camera-rating';
import TabsData from '../tabs/tabs-data/tabs-data';

type CameraDetailsProps = {
  camera: TCamera;
};

function CameraDetails({ camera }: CameraDetailsProps): JSX.Element {
  return (
    <div className="page-content__section" data-testid="camera-details">
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
              cardType={CardType.Details}
            />
            <p className="product__price">
              <span className="visually-hidden">Цена:</span>
              {addSpaceInPrice(camera.price)} ₽
            </p>
            <AddToBasketButton />
            <TabsData camera={camera} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default CameraDetails;
