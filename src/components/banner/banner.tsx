import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import React, { memo } from 'react';

import { TPromos } from '../../types/promos';
import { Link } from 'react-router-dom';
import { AppRoute, BANNER_DELAY } from '../../const';

import 'swiper/css';
import 'swiper/css/bundle';
import './banner.css';

type BannerProps = {
  promos: TPromos;
};

const Banner: React.FC<BannerProps> = memo(({ promos }: BannerProps) => {
  const swiperModules = [Autoplay, Pagination];
  const swiperAutoplay = {
    delay: BANNER_DELAY,
  };
  const swiperPagination = {
    clickable: true,
    el: '.swiper-pagination',
  };

  return (
    <Swiper
      className="banner-swiper"
      data-testid="banner"
      modules={swiperModules}
      autoplay={swiperAutoplay}
      pagination={swiperPagination}
    >
      {promos.map((promo) => (
        <SwiperSlide key={promo.id}>
          <div className="banner">
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
        </SwiperSlide>
      ))}
      <div className="swiper-pagination swiper-pagination-bullets" />
    </Swiper>
  );
});

Banner.displayName = 'Banner';
export default Banner;
