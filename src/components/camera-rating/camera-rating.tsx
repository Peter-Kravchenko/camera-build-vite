import cn from 'classnames';
import { CardType, stars } from '../../const';
import { TCamera } from '../../types/cameras';

type CameraRatingProps = {
  rating: TCamera['rating'];
  reviewCount: TCamera['reviewCount'];
  cardType: CardType;
};

function CameraRating({
  rating,
  reviewCount,
  cardType,
}: CameraRatingProps): JSX.Element {
  return (
    <div
      className={cn('rate', {
        'product-card__rate': cardType === CardType.Catalog,
        product__rate: cardType === CardType.Details,
      })}
      data-testid="camera-rating"
    >
      {stars.map((star) => (
        <svg key={star} width={17} height={16} aria-hidden="true">
          {star <= Math.floor(rating) ? (
            <use xlinkHref="#icon-full-star" />
          ) : (
            <use xlinkHref="#icon-star" />
          )}
        </svg>
      ))}

      <p className="visually-hidden">Рейтинг: {rating}</p>
      <p className="rate__count">
        <span className="visually-hidden">Всего оценок:</span>
        {reviewCount}
      </p>
    </div>
  );
}

export default CameraRating;
