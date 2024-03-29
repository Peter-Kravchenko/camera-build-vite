import cn from 'classnames';
import { toast } from 'react-toastify';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import { RequestStatus, ratingMap } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../../hooks/index';
import {
  closeAddReviewModal,
  openAddReviewSuccessModal,
} from '../../../store/modal-process/modal-process.slice';
import { TAddReview } from '../../../types/reviews';
import { addReview, fetchReviews } from '../../../store/api-actions';
import { getAddReviewFetchingStatus } from '../../../store/add-review-data/add-review.selectors';
import { resetAddReviewFetchigStatus } from '../../../store/add-review-data/add-review.slice';
import { commonReviewConfig } from '../../../const';

function AddReviewModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const fetchingStatus = useAppSelector(getAddReviewFetchingStatus);
  const isSending = fetchingStatus === RequestStatus.Pending;
  const cameraId = Number(useParams().id);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setFocus,
    formState: { errors, isValid },
  } = useForm<TAddReview>({
    mode: 'onBlur',
  });

  const onFormSubmit: SubmitHandler<TAddReview> = (formData) => {
    const rating = Number(formData.rating);
    dispatch(
      addReview({
        ...formData,
        rating,
        cameraId,
      })
    );
  };

  const closeModal = () => {
    dispatch(closeAddReviewModal());
  };

  useEffect(() => {
    if (fetchingStatus === RequestStatus.Rejected) {
      toast.error('Не удалось отправить отзыв, Пожалуйста попробуйте еще раз');
    }
    if (fetchingStatus === RequestStatus.Success) {
      dispatch(fetchReviews(cameraId));
      dispatch(closeAddReviewModal());
      dispatch(openAddReviewSuccessModal());
      reset();
    }
    dispatch(resetAddReviewFetchigStatus());
    setFocus('rating');
  }, [dispatch, fetchingStatus, reset, setFocus, cameraId]);

  return (
    <div className="modal__content" data-testid="add-review-modal">
      <p className="title title--h4">Оставить отзыв</p>
      <div className="form-review">
        <form
          onSubmit={(e) => {
            handleSubmit(onFormSubmit)(e);
          }}
          method="post"
          noValidate
        >
          <div className="form-review__rate">
            <fieldset
              className={cn('rate', 'form-review__item', {
                'is-invalid': errors.rating,
              })}
            >
              <legend className="rate__caption">
                Рейтинг
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake" />
                </svg>
              </legend>
              <div className="rate__bar">
                <div className="rate__group" tabIndex={0}>
                  {Object.entries(ratingMap)
                    .reverse()
                    .map(([key, value]) => (
                      <Fragment key={key}>
                        <input
                          className="visually-hidden"
                          id={`star-${key}`}
                          type="radio"
                          value={key}
                          disabled={isSending}
                          {...register('rating', {
                            required: 'Нужно оценить товар',
                          })}
                        />
                        <label
                          className="rate__label"
                          htmlFor={`star-${key}`}
                          title={value}
                        />
                      </Fragment>
                    ))}
                </div>
                <div className="rate__progress">
                  <span className="rate__stars">
                    {watch().rating ? watch().rating : 0}
                  </span>{' '}
                  <span>/</span> <span className="rate__all-stars">5</span>
                </div>
              </div>
              <p className="rate__message">Нужно оценить товар</p>
            </fieldset>
            <div
              className={cn('custom-input form-review__item', {
                'is-invalid': errors.userName,
              })}
            >
              <label>
                <span className="custom-input__label ">
                  Ваше имя
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Введите ваше имя"
                  disabled={isSending}
                  {...register('userName', {
                    required: 'Нужно укзать имя',
                    minLength: {
                      value: 2,
                      message: 'Минимум 2 символа',
                    },
                    maxLength: {
                      value: 15,
                      message: 'Максимум 15 символов',
                    },
                  })}
                />
              </label>
              <p className="custom-input__error">{errors.userName?.message}</p>
            </div>
            <div
              className={cn('custom-input', 'form-review__item', {
                'is-invalid': errors.advantage,
              })}
            >
              <label>
                <span className="custom-input__label">
                  Достоинства
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Основные преимущества товара"
                  disabled={isSending}
                  {...register('advantage', {
                    ...commonReviewConfig,
                    required: 'Нужно указать достоинства',
                  })}
                />
              </label>
              <p className="custom-input__error">{errors.advantage?.message}</p>
            </div>
            <div
              className={cn('custom-input', 'form-review__item', {
                'is-invalid': errors.disadvantage,
              })}
            >
              <label>
                <span className="custom-input__label">
                  Недостатки
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Главные недостатки товара"
                  disabled={isSending}
                  {...register('disadvantage', {
                    ...commonReviewConfig,
                    required: 'Нужно указать недостатки',
                  })}
                />
              </label>
              <p className="custom-input__error">
                {errors.disadvantage?.message}
              </p>
            </div>
            <div
              className={cn('custom-textarea', 'form-review__item', {
                'is-invalid': errors.review,
              })}
            >
              <label>
                <span className="custom-textarea__label">
                  Комментарий
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake" />
                  </svg>
                </span>
                <textarea
                  disabled={isSending}
                  placeholder="Поделитесь своим опытом покупки"
                  {...register('review', {
                    ...commonReviewConfig,
                    required: 'Нужно добавить комментарий',
                  })}
                />
              </label>
              <div className="custom-textarea__error">
                {errors.review?.message}
              </div>
            </div>
          </div>
          <button
            className="btn btn--purple form-review__btn"
            type="submit"
            disabled={isSending || !isValid}
          >
            Отправить отзыв
          </button>
        </form>
      </div>
      <button
        onClick={() => closeModal()}
        className="cross-btn"
        type="button"
        aria-label="Закрыть попап"
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </div>
  );
}

export default AddReviewModal;
