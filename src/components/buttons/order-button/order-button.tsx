import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';

function OrderButton() {
  const basketCount = 0; // Заглушка, пока не будет реализована логика подсчета количества карточек в корзине

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
