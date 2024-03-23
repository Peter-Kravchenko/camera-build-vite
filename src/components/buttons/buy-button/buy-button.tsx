import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchCamera } from '../../../store/api-actions';
import { openAddToBasketModal } from '../../../store/modal-process/modal-process.slice';
import { TCamera } from '../../../types/cameras';
import { AppRoute } from '../../../const';
import { getOrders } from '../../../store/order-data/order-data.selectors';

type BuyButtonProps = {
  id: TCamera['id'];
};

function BuyButton({ id }: BuyButtonProps): JSX.Element {
  const dispatch = useAppDispatch();

  const isInBasket = useAppSelector(getOrders).some(
    (camera) => camera.id === id
  );

  return isInBasket ? (
    <Link
      to={AppRoute.Order}
      className="btn btn--purple-border product-card__btn product-card__btn--in-cart"
    >
      <svg width="16" height="16" aria-hidden="true">
        <use xlinkHref="#icon-basket"></use>
      </svg>
      В корзине
    </Link>
  ) : (
    <button
      onClick={() => {
        dispatch(fetchCamera(Number(id)));
        dispatch(openAddToBasketModal());
      }}
      className="btn btn--purple product-card__btn"
      type="button"
    >
      Купить
    </button>
  );
}

export default BuyButton;
