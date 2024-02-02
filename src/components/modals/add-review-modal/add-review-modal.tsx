import { Fragment, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RequestStatus, ratingMap } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../../hooks/index';
import useEscKeyHandle from '../../../hooks/use-esc-key-handle/use-esc-key-handle';
import {
  closeAddReviewModal,
  openAddReviewSuccessModal,
} from '../../../store/modal-process/modal-process.slice';
import {
  TAddReviewFormData,
  TAddReviewFormValues,
} from '../../../types/reviews';
import { addReview } from '../../../store/api-actions';
import { TCamera } from '../../../types/cameras';
import { getAddReviewFetchingStatus } from '../../../store/add-review-data/add-review.selectors';
import cn from 'classnames';
import { toast } from 'react-toastify';
import { resetAddReviewFetchigStatus } from '../../../store/add-review-data/add-review.slice';

type AddReviewModalProps = {
  cameraId: TCamera['id'];
};

function AddReviewModal({ cameraId }: AddReviewModalProps): JSX.Element {
  const dispatch = useAppDispatch();
  const fetchingStatus = useAppSelector(getAddReviewFetchingStatus);
  const isSending = fetchingStatus === RequestStatus.Pending;

  const closeModal = () => {
    dispatch(closeAddReviewModal());
  };

  useEscKeyHandle(closeModal);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<TAddReviewFormValues>({
    // defaultValues: { rating: 0 },
    mode: 'onBlur',
  });

  const onFormSubmit: SubmitHandler<TAddReviewFormData> = (formData) => {
    const { userName, advantage, disadvantage, review, rating } = formData;
    const currentData: TAddReviewFormData = {
      userName,
      advantage,
      disadvantage,
      review,
      rating: Number(rating),
      cameraId: Number(cameraId),
    };
    dispatch(addReview(currentData));
  };

  useEffect(() => {
    if (fetchingStatus === RequestStatus.Rejected) {
      toast.error('Не удалось отправить отзыв, Пожалуйста попробуйте еще раз');
    }
    if (fetchingStatus === RequestStatus.Success) {
      dispatch(closeAddReviewModal());
      dispatch(openAddReviewSuccessModal());
      reset();
    }
    dispatch(resetAddReviewFetchigStatus());
  }, [dispatch, fetchingStatus, reset]);

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay" />
        <div className="modal__content">
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
                    <div className="rate__group">
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
                  <p className="custom-input__error">
                    {errors.userName?.message}
                  </p>
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
                        required: 'Нужно указать достоинства',
                        minLength: {
                          value: 10,
                          message: 'Минимум 10 символов',
                        },
                        maxLength: {
                          value: 160,
                          message: 'Максимум 160 символов',
                        },
                      })}
                    />
                  </label>
                  <p className="custom-input__error">
                    {errors.advantage?.message}
                  </p>
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
                      {...register('disadvantage', {
                        required: 'Нужно указать недостатки',
                        minLength: {
                          value: 10,
                          message: 'Минимум 10 символов',
                        },
                        maxLength: {
                          value: 160,
                          message: 'Максимум 160 символов',
                        },
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
                      placeholder="Поделитесь своим опытом покупки"
                      {...register('review', {
                        required: 'Нужно добавить комментарий',
                        minLength: {
                          value: 10,
                          message: 'Минимум 10 символа',
                        },
                        maxLength: {
                          value: 160,
                          message: 'Максимум 160 символов',
                        },
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
            onClick={() => dispatch(closeAddReviewModal())}
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
          >
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddReviewModal;

//todo заблокировать стпаницу при открытиии модального окна
