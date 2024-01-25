import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { TPromo } from '../../types/promo';

type PromoProps = {
  promo: TPromo;
};
function Promo({ promo }: PromoProps): JSX.Element {
  const item = promo[0];
  return (
    <div className="banner">
      <div>
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
              alt="баннер"
            />
          </picture>
          <p className="banner__info">
            <span className="banner__message">Новинка!</span>
            <span className="title title--h1">{item.name}</span>
            <span className="banner__text">
              Профессиональная камера от&nbsp;известного производителя
            </span>
            <a className="btn" href="#">
              Подробнее
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Promo;
