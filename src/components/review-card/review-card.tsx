import { stars } from '../../const';
import { TReview } from '../../types/reviews';
import { getReviewDate, getReviewDateTime } from '../../utils/utils';

type ReviewCardProps = {
  review: TReview;
};

function ReviewCard({ review }: ReviewCardProps): JSX.Element {
  return (
    <li className="review-card" data-testid="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{review.userName}</p>
        <time
          className="review-card__data"
          dateTime={getReviewDateTime(review.createAt)}
        >
          {getReviewDate(review.createAt)}
        </time>
      </div>
      <div className="rate review-card__rate">
        {stars.map((star) => (
          <svg key={star} width={17} height={16} aria-hidden="true">
            {star <= Math.floor(review.rating) ? (
              <use xlinkHref="#icon-full-star" />
            ) : (
              <use xlinkHref="#icon-star" />
            )}
          </svg>
        ))}
        <p className="visually-hidden">Оценка: {review.rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list">
          <span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{review.advantage}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{review.disadvantage}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review.review}</p>
        </li>
      </ul>
    </li>
  );
}

export default ReviewCard;
