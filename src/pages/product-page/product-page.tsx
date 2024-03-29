import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import {
  fetchCamera,
  fetchReviews,
  fetchSimilar,
} from '../../store/api-actions';
import {
  getCamera,
  getCameraFetchingStatus,
} from '../../store/camera-data/camera-data.selectors';
import { PageBlock, RequestStatus } from '../../const';
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
import CameraDetails from '../../components/camera-details/camera-details';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { checkModalOpen } from '../../store/modal-process/modal-process.selectors';
import { resetAppProcess } from '../../store/app-process/app-process.slice';

import UpButton from '../../components/up-button/up-button';
import ModalData from '../../components/modals/modal-data/modal-data';
import Loader from '../../components/loader/loader';

function ProductPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const id = Number(useParams().id);

  useEffect(() => {
    if (id) {
      dispatch(fetchCamera(id));
    }
  }, [id, dispatch]);

  const camera = useAppSelector(getCamera);
  const cameraFetchingStatus = useAppSelector(getCameraFetchingStatus);

  useEffect(() => {
    if (id && camera) {
      dispatch(fetchSimilar(id));
      dispatch(fetchReviews(id));
    }
    dispatch(resetAppProcess());
  }, [id, camera, dispatch]);

  const similar = useAppSelector(getSimilar);
  const similarFetchingStatus = useAppSelector(getSimilarFetchingStatus);

  const reviews = useAppSelector(getReviews);
  const reviewsFetchingStatus = useAppSelector(getReviewsFetchingStatus);

  const isModalOpen = useAppSelector(checkModalOpen);

  if (
    cameraFetchingStatus === RequestStatus.Pending ||
    similarFetchingStatus === RequestStatus.Pending ||
    reviewsFetchingStatus === RequestStatus.Pending
  ) {
    return <Loader />;
  }

  if (!camera || cameraFetchingStatus === RequestStatus.Rejected) {
    return (
      <h2>Камера не найдена на сервере, пожалуйста, попробуйте ещё раз</h2>
    );
  }

  return (
    <>
      <main>
        <div className="page-content" data-testid="product-page">
          <Breadcrumbs pageBlock={PageBlock.Camera} camera={camera} />
          <CameraDetails camera={camera} />
          {similar && similarFetchingStatus === RequestStatus.Success ? (
            <Similar similar={similar} />
          ) : (
            <div className="container">
              <h2 className="title title--h3">Похожие товары не найдены</h2>
            </div>
          )}
          <ReviewsList reviews={reviews} />
        </div>
        {isModalOpen && <ModalData />}
      </main>
      <UpButton />
    </>
  );
}

export default ProductPage;
