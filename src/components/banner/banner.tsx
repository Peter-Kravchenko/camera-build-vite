import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import { TPromos } from '../../types/promo';
import { Link } from 'react-router-dom';
import { AppRoute, BANNER_DELAY } from '../../const';

import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type BannerProps = {
  promos: TPromos;
};
function Banner({ promos: promos }: BannerProps): JSX.Element {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      autoplay={{ delay: BANNER_DELAY }}
      pagination={{ clickable: true }}
      navigation
    >
      {promos.map((promo) => (
        <SwiperSlide key={promo.id}>
          <div className="banner">
            <div key={promo.id}>
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${promo.previewImgWebp}, ${promo.previewImgWebp2x}}`}
                />
                <img
                  src={promo.previewImg}
                  srcSet={promo.previewImg2x}
                  width={1280}
                  height={280}
                  alt={promo.name}
                />
              </picture>
              <p className="banner__info">
                <span className="banner__message">Новинка!</span>
                <span className="title title--h1">{promo.name}</span>
                <span className="banner__text">
                  Профессиональная камера от&nbsp;известного производителя
                </span>
                <Link
                  to={AppRoute.Product.replace(':id', String(promo.id))}
                  className="btn"
                >
                  Подробнее
                </Link>
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Banner;
