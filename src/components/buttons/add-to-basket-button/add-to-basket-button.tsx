import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { openAddToBasketModal } from '../../../store/modal-process/modal-process.slice';
import { AppRoute } from '../../../const';
import { getOrders } from '../../../store/order-data/order-data.selectors';
import { TCamera } from '../../../types/cameras';

type AddToBasketButtonProps = {
  id: TCamera['id'];
};

function AddToBasketButton({ id }: AddToBasketButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isInBasket = useAppSelector(getOrders).some(
    (camera) => camera.id === id
  );

  return isInBasket ? (
    <button
      onClick={() => navigate(AppRoute.Order)}
      className="btn btn--purple-border product-card__btn product-card__btn--in-cart"
      type="button"
    >
      <svg width={24} height={16} aria-hidden="true">
        <use xlinkHref="#icon-add-basket" />
      </svg>
      В корзине
    </button>
  ) : (
    <button
      onClick={() => dispatch(openAddToBasketModal())}
      className="btn btn--purple"
      type="button"
    >
      <svg width={24} height={16} aria-hidden="true">
        <use xlinkHref="#icon-add-basket" />
      </svg>
      Добавить в корзину
    </button>
  );
}

export default AddToBasketButton;
