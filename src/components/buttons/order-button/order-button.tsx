import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { useAppSelector } from '../../../hooks';
import { getOrders } from '../../../store/order-data/order-data.selectors';

function OrderButton() {
  const basketCount = useAppSelector(getOrders).reduce(
    (acc, order) => acc + order.quantity,
    0
  );

  return (
    <Link to={AppRoute.Order} className="header__basket-link">
      <svg width={16} height={16} aria-hidden="true">
        <use xlinkHref="#icon-basket" />
      </svg>
      {basketCount > 0 && (
        <span className="header__basket-count">{basketCount}</span>
      )}
    </Link>
  );
}

export default OrderButton;
