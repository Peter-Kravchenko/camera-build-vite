import { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { fetchCamera } from '../../store/api-actions';
import { openRemoveFromBasketModal } from '../../store/modal-process/modal-process.slice';
import { addSpaceInPrice } from '../../utils/utils';
import { changeQuantity } from '../../store/order-data/order-data.slice';
import { TOrder } from '../../types/orders';

type OrderCardProps = {
  order: TOrder;
};

function OrderCard({ order }: OrderCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState(order.quantity);

  const handleDecreaseQtyClick = () => {
    setQuantity(quantity - 1);
    dispatch(changeQuantity([order.id, quantity - 1]));
  };
  const handleIncreaseQtyClick = () => {
    setQuantity(quantity + 1);
    dispatch(changeQuantity([order.id, quantity + 1]));
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '0') {
      console.log('nulll');
      setQuantity(1);
      //setQuantity(1);
    } else {
      setQuantity(parseInt(e.target.value, 10));
    }
  };

  const handleQtyValue = () => {
    if (quantity < 1) {
      setQuantity(1);
      dispatch(changeQuantity([order.id, 1]));
    }
    if (quantity > 99) {
      setQuantity(99);
      dispatch(changeQuantity([order.id, 99]));
    } else if (quantity >= 1 && quantity <= 99) {
      dispatch(changeQuantity([order.id, quantity]));
    }
  };

  const handleQtyValueBlur = () => {
    handleQtyValue();
  };

  const handleQtyValueKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleQtyValue();
    }
  };

  const handleDeleteOrderClick = () => {
    dispatch(fetchCamera(order.id));
    dispatch(openRemoveFromBasketModal());
  };

  return (
    <li className="basket-item" data-testid="order-card">
      <div className="basket-item__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${order.previewImgWebp}, ${order.previewImgWebp2x}`}
          />
          <img
            src={order.previewImg}
            srcSet={order.previewImgWebp2x}
            width={140}
            height={120}
            alt={order.name}
          />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{order.name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул:</span>{' '}
            <span className="basket-item__number">{order.vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{order.type} фотокамера</li>
          <li className="basket-item__list-item">{order.level} уровень</li>
        </ul>
      </div>
      <p className="basket-item__price">
        <span className="visually-hidden">Цена:</span>
        {addSpaceInPrice(order['price'])} ₽
      </p>
      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          onClick={handleDecreaseQtyClick}
          disabled={order.quantity === 1}
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
        <label className="visually-hidden" htmlFor={`counter${order.id}`} />
        <input
          type="number"
          id={`counter${order.id}`}
          value={quantity}
          aria-label="количество товара"
          onChange={handleValueChange}
          onBlur={handleQtyValueBlur}
          onKeyDown={handleQtyValueKeyDown}
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          onClick={handleIncreaseQtyClick}
          disabled={order.quantity === 99}
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>
        {addSpaceInPrice(order['price'] * order.quantity)} ₽
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
        onClick={handleDeleteOrderClick}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </li>
  );
}

export default OrderCard;
