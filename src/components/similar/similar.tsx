import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CardType, MAX_SIMILAR_CAMERAS_ON_PAGE } from '../../const';
import { TCameras } from '../../types/cameras';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { getSimilarSliderIndex } from '../../store/app-process/app-process.selectors';
import { setSimilarSliderIndex } from '../../store/app-process/app-process.slice';
import CameraCard from '../camera-card/camera-card';

import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';

type SimilarProps = {
  similar: TCameras;
};

function Similar({ similar }: SimilarProps): JSX.Element {
  const dispatch = useAppDispatch();
  const sliderIndex = useAppSelector(getSimilarSliderIndex);

  const handleNextButttonClick = () => {
    dispatch(setSimilarSliderIndex(sliderIndex + MAX_SIMILAR_CAMERAS_ON_PAGE));
  };
  const handleBackButtonClick = () => {
    dispatch(setSimilarSliderIndex(sliderIndex - MAX_SIMILAR_CAMERAS_ON_PAGE));
  };

  const isBackButtonDisabled = sliderIndex === 0;
  const isNextButtonDisabled =
    sliderIndex + MAX_SIMILAR_CAMERAS_ON_PAGE >= similar.length;

  return (
    <div className="page-content__section" data-testid="similar">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <Swiper
              className="product-similar__slider-list"
              slidesPerView={3}
              slidesPerGroup={3}
              spaceBetween={30}
              modules={[Navigation]}
              navigation={{
                prevEl: '.slider-controls--prev',
                nextEl: '.slider-controls--next',
              }}
            >
              {similar.map((camera) => (
                <SwiperSlide key={camera.id}>
                  <CameraCard camera={camera} cardType={CardType.Similar} />
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              onClick={handleBackButtonClick}
              className="slider-controls slider-controls--prev"
              type="button"
              aria-label="Предыдущий слайд"
              disabled={isBackButtonDisabled}
            >
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow" />
              </svg>
            </button>
            <button
              onClick={handleNextButttonClick}
              className="slider-controls slider-controls--next"
              type="button"
              aria-label="Следующий слайд"
              disabled={isNextButtonDisabled}
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
