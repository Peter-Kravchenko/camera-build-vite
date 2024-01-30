import { TCameras } from '../../types/cameras';
import CameraCard from '../camera-card/camera-card';

type SimilarProps = {
  similar: TCameras;
};

function Similar({ similar }: SimilarProps): JSX.Element {
  const similarToRender = similar.slice(0, 3);

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <div className="product-similar__slider-list">
              {similarToRender.slice(0, 3).map((camera) => (
                <CameraCard key={camera.id} camera={camera} isSimilar />
              ))}
            </div>
            <button
              className="slider-controls slider-controls--prev"
              type="button"
              aria-label="Предыдущий слайд"
              disabled
            >
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow" />
              </svg>
            </button>
            <button
              className="slider-controls slider-controls--next"
              type="button"
              aria-label="Следующий слайд"
            >
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Similar;
