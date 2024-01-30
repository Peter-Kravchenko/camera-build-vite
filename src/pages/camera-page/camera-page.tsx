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
  getModalAddToBasketOpen,
  getModalAddToBasketSuccessOpen,
} from '../../store/modal-process/modal-process.selectors';
import AddTobasketModal from '../../components/modals/add-to-basket-modal/add-tobasket-modal';
import AddToBasketSuccessModal from '../../components/modals/add-to-basket-success-modal/add-to-basket-success-modal';

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

  const isModalOpen = useAppSelector(getModalAddToBasketOpen);
  const isModalSuccessOpen = useAppSelector(getModalAddToBasketSuccessOpen);

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
      {isModalOpen && <AddTobasketModal />}
      {isModalSuccessOpen && <AddToBasketSuccessModal />}
    </main>
  ) : (
    <h2>Камера не найдена на сервере, пожалуйста, попробуйте ещё раз</h2>
  );
}

export default ProductPage;
