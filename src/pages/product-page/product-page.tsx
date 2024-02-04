import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index/index';
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
import CameraDatails from '../../components/camera-details/camera-datails';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import {
  getModalAddReviewOpen,
  getModalAddReviewSuccessOpen,
  getModalAddToBasketOpen,
  getModalAddToBasketSuccessOpen,
} from '../../store/modal-process/modal-process.selectors';
import { resetAppProcess } from '../../store/app-process/app-process.slice';
import { resetModalStatus } from '../../store/modal-process/modal-process.slice';
import AddTobasketModal from '../../components/modals/add-to-basket-modal/add-tobasket-modal';
import AddToBasketSuccessModal from '../../components/modals/add-to-basket-success-modal/add-to-basket-success-modal';
import AddReviewSuccessModal from '../../components/modals/add-review-success-modal/add-review-success-modal';
import AddReviewModal from '../../components/modals/add-review-modal/add-review-modal';
import UpButton from '../../components/up-button/up-button';

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
    dispatch(resetAppProcess());
    dispatch(resetModalStatus());
  }, [id, camera, dispatch]);

  const similar = useAppSelector(getSimilar);
  const similarFetchingStatus = useAppSelector(getSimilarFetchingStatus);

  const reviews = useAppSelector(getReviews);
  const reviewsFetchingStatus = useAppSelector(getReviewsFetchingStatus);

  const isModalAddToBasketOpen = useAppSelector(getModalAddToBasketOpen);
  const isModalAddToBasketSuccessOpen = useAppSelector(
    getModalAddToBasketSuccessOpen
  );
  const isModalAddReviewOpen = useAppSelector(getModalAddReviewOpen);
  const isModalAddReviewSuccessOpen = useAppSelector(
    getModalAddReviewSuccessOpen
  );

  if (
    cameraFetchingStatus === RequestStatus.Pending ||
    similarFetchingStatus === RequestStatus.Pending ||
    reviewsFetchingStatus === RequestStatus.Pending
  ) {
    return <h1>Loading...</h1>;
  }

  return camera && cameraFetchingStatus === RequestStatus.Success ? (
    <>
      <main>
        <div className="page-content">
          <Breadcrumbs pageBlock={PageBlock.Camera} camera={camera} />
          <CameraDatails camera={camera} />
          {similar && similarFetchingStatus === RequestStatus.Success ? (
            <Similar similar={similar} />
          ) : (
            <div className="container">
              <h2 className="title title--h3">Похожие товары не найдены</h2>
            </div>
          )}
          <ReviewsList reviews={reviews} />
        </div>
        {isModalAddToBasketOpen && <AddTobasketModal />}
        {isModalAddToBasketSuccessOpen && <AddToBasketSuccessModal />}
        {isModalAddReviewOpen && <AddReviewModal cameraId={camera.id} />}
        {isModalAddReviewSuccessOpen && <AddReviewSuccessModal />}
      </main>
      <UpButton />
    </>
  ) : (
    <h2>Камера не найдена на сервере, пожалуйста, попробуйте ещё раз</h2>
  );
}

export default ProductPage;
