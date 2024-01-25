import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { TPromo } from '../../types/promo';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type BannerProps = {
  promo: TPromo;
};
function Banner({ promo }: BannerProps): JSX.Element {
  return (
    <Swiper>
      {promo.map((item) => (
        <SwiperSlide key={item.id}>
          <div className="banner">
            <div key={item.id}>
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${item.previewImgWebp}, ${item.previewImgWebp2x}}`}
                />
                <img
                  src={item.previewImg}
                  srcSet={item.previewImg2x}
                  width={1280}
                  height={280}
                  alt={item.name}
                />
              </picture>
              <p className="banner__info">
                <span className="banner__message">Новинка!</span>
                <span className="title title--h1">{item.name}</span>
                <span className="banner__text">
                  Профессиональная камера от&nbsp;известного производителя
                </span>
                <Link
                  to={AppRoute.Product.replace(':id', String(item.id))}
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
