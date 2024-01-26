import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/index/index';
import { useEffect } from 'react';
import {
  fetchCamera,
  fetchReviews,
  fetchSimilar,
} from '../../store/api-actions';
import {
  getCamera,
  getCameraFetchingStatus,
} from '../../store/camera-data/camera-data.selectors';
import { RequestStatus } from '../../const';
import Similar from '../../components/similar/similar';
import ReviewsList from '../../components/reviews-list/reviews-list';
import {
  getSimilar,
  getSimilarFetchingStatus,
} from '../../store/similar-data/similar-data.selectors';
import {
  getReviews,
  getReviewsFetchingStatus,
} from '../../store/reviews-data/reviews-data.selectors';
import CameraDatails from '../../components/camera-details/camera-datails';

function ProductPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchCamera(Number(id)));
    }
  }, [id, dispatch]);

  const camera = useAppSelector(getCamera);
  const cameraFetchingStatus = useAppSelector(getCameraFetchingStatus);

  useEffect(() => {
    if (id && camera) {
      dispatch(fetchSimilar(Number(id)));
      dispatch(fetchReviews(Number(id)));
    }
  }, [id, camera, dispatch]);

  const similar = useAppSelector(getSimilar);
  const similarFetchingStatus = useAppSelector(getSimilarFetchingStatus);

  const reviews = useAppSelector(getReviews);
  const reviewsFetchingStatus = useAppSelector(getReviewsFetchingStatus);

  if (
    cameraFetchingStatus === RequestStatus.Pending ||
    similarFetchingStatus === RequestStatus.Pending ||
    reviewsFetchingStatus === RequestStatus.Pending
  ) {
    return <h1>Loading...</h1>;
  }

  return camera && cameraFetchingStatus === RequestStatus.Success ? (
    <main>
      <div className="page-content">
        <div className="breadcrumbs">
          <div className="container">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link" href="index.html">
                  Главная
                  <svg width={5} height={8} aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini" />
                  </svg>
                </a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link" href="catalog.html">
                  Каталог
                  <svg width={5} height={8} aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini" />
                  </svg>
                </a>
              </li>
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link breadcrumbs__link--active">
                  {camera.name}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <CameraDatails camera={camera} />
        {similar.length > 0 &&
        similarFetchingStatus === RequestStatus.Success ? (
          <Similar similar={similar} />
        ) : (
          <div className="container">
            <h2 className="title title--h3">Похожие товары не найдены</h2>
          </div>
        )}
        <ReviewsList reviews={reviews} />
      </div>
    </main>
  ) : (
    <h2>Камера не найдена на сервере, пожалуйста, попробуйте ещё раз</h2>
  );
}

export default ProductPage;
