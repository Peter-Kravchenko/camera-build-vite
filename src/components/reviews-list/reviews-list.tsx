import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { TReviews } from '../../types/reviews';
import { getReviewsQtyOnPage } from '../../store/app-process/app-process.selectors';
import ReviewCard from '../review-card/review-card';
import { showMoreReviews } from '../../store/app-process/app-process.slice';
import { openAddReviewModal } from '../../store/modal-process/modal-process.slice';

type ReviewsProps = {
  reviews: TReviews;
};

function ReviewsList({ reviews }: ReviewsProps): JSX.Element {
  const dispatch = useAppDispatch();

  const reviewsQtyOnPage = useAppSelector(getReviewsQtyOnPage);
  const reviewsOnPage = reviews.slice(0, reviewsQtyOnPage);

  const isShowMore = reviews.length > reviewsQtyOnPage;

  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button
              onClick={() => dispatch(openAddReviewModal())}
              className="btn"
              type="button"
            >
              Оставить свой отзыв
            </button>
          </div>
          <ul className="review-block__list">
            {reviewsOnPage.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </ul>
          <div className="review-block__buttons">
            {isShowMore && (
              <button
                onClick={() => dispatch(showMoreReviews())}
                className="btn btn--purple"
                type="button"
              >
                Показать больше отзывов
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ReviewsList;
