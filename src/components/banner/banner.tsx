import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import { TPromos } from '../../types/promo';
import { Link } from 'react-router-dom';
import { AppRoute, BANNER_DELAY } from '../../const';

import 'swiper/css';
import 'swiper/css/bundle';

type BannerProps = {
  promos: TPromos;
};
function Banner({ promos }: BannerProps): JSX.Element {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      autoplay={{ delay: BANNER_DELAY }}
      pagination={{ clickable: true, el: '.swiper-pagination' }}
      style={
        {
          '--swiper-pagination-color': '#7575E2',
          '--swiper-pagination-bullet-inactive-color': ' #F4F4FC',
          '--swiper-pagination-bullet-inactive-opacity': '100%',
          '--swiper-pagination-bullet-size': '16px',
          '--swiper-pagination-bullet-horizontal-gap': '6px',
        } as React.CSSProperties
      }
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
      <div
        className="swiper-pagination"
        style={
          {
            color: '#7575E2',
            paddingLeft: '1196px',
            paddingTop: '310px',
          } as React.CSSProperties
        }
      />
    </Swiper>
  );
}

export default Banner;
