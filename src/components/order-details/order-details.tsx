import cn from 'classnames';
import { useEffect, useState } from 'react';
import { coupons, RequestStatus, ValidationMap } from '../../const';
import { TOrders } from '../../types/orders';
import { addSpaceInPrice } from '../../utils/utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postCoupon, postOrder } from '../../store/api-actions';
import {
  getCamerasIds,
  getCoupon,
  getCouponFetchingStatus,
  getOrderFetchingStatus,
} from '../../store/order-data/order-data.selectors';
import {
  clearBasket,
  resetCouponFetchingStatus,
  resetOrderFetchingStatus,
} from '../../store/order-data/order-data.slice';
import { openOrderSuccessModal } from '../../store/modal-process/modal-process.slice';

type OrderSummaryProps = {
  orders: TOrders;
};

function OrderDetails({ orders }: OrderSummaryProps): JSX.Element {
  const dispatch = useAppDispatch();

  const camerasIds = useAppSelector(getCamerasIds);
  const coupon = useAppSelector(getCoupon);

  const [couponValue, setCouponValue] = useState(coupon?.coupon || '');
  const [validCoupon, setValidCoupon] = useState(ValidationMap.Idle);

  const totalPrice = orders.reduce(
    (acc, order) =>
      order.quantity ? acc + order.price * order.quantity : acc + order.price,
    0
  );
  const totalDiscount = coupon
    ? Math.round((totalPrice / 100) * coupon.discount)
    : 0;

  const couponFetchingStatus = useAppSelector(getCouponFetchingStatus);
  const orderFetchingStatus = useAppSelector(getOrderFetchingStatus);

  const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validValue = e.target.value.replaceAll(' ', '').toLowerCase();
    setValidCoupon(ValidationMap.Idle);
    setCouponValue(validValue);
  };

  const handleCouponClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(postCoupon(couponValue));
  };

  const handleOrderClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(
      postOrder({
        camerasIds,
        coupon:
          coupons.includes(couponValue) && validCoupon === ValidationMap.Success
            ? couponValue
            : null,
      })
    );
  };

  useEffect(() => {
    if (coupons.includes(couponValue)) {
      setValidCoupon(ValidationMap.Success);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (couponFetchingStatus === RequestStatus.Success) {
      setValidCoupon(ValidationMap.Success);
    }
    if (couponFetchingStatus === RequestStatus.Rejected) {
      setValidCoupon(ValidationMap.Error);
    }
    dispatch(resetCouponFetchingStatus());
  }, [couponFetchingStatus, dispatch]);

  useEffect(() => {
    if (orderFetchingStatus === RequestStatus.Success) {
      dispatch(clearBasket());
      dispatch(openOrderSuccessModal());
    }

    dispatch(resetOrderFetchingStatus());
  }, [orderFetchingStatus, dispatch]);

  return (
    <div className="basket__summary" data-testid="order-details">
      <div className="basket__promo">
        <p className="title title--h4">
          Если у вас есть промокод на скидку, примените его в этом поле
        </p>
        <div className="basket-form">
          <form action="#">
            <div
              className={cn('custom-input', {
                'is-valid': validCoupon === ValidationMap.Success,
                'is-invalid': validCoupon === ValidationMap.Error,
              })}
            >
              <label>
                <span className="custom-input__label">Промокод</span>
                <input
                  type="text"
                  name="promo"
                  placeholder="Введите промокод"
                  value={couponValue}
                  onChange={handleCouponChange}
                />
              </label>
              <p className="custom-input__error">Промокод неверный</p>
              <p className="custom-input__success">Промокод принят!</p>
            </div>
            <button
              className="btn"
              type="submit"
              onClick={handleCouponClick}
              disabled={couponFetchingStatus === RequestStatus.Pending}
            >
              Применить
            </button>
          </form>
        </div>
      </div>
      <div className="basket__summary-order">
        <p className="basket__summary-item">
          <span className="basket__summary-text">Всего:</span>
          <span className="basket__summary-value">
            {addSpaceInPrice(totalPrice)} ₽
          </span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text">Скидка:</span>
          <span
            className={cn('basket__summary-value', {
              'basket__summary-value--bonus':
                validCoupon === ValidationMap.Success,
            })}
          >
            {coupons.includes(couponValue) &&
            validCoupon === ValidationMap.Success
              ? addSpaceInPrice(totalDiscount)
              : 0}{' '}
            ₽
          </span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text basket__summary-text--total">
            К оплате:
          </span>
          <span className="basket__summary-value basket__summary-value--total">
            {addSpaceInPrice(
              coupons.includes(couponValue) &&
                validCoupon === ValidationMap.Success
                ? totalPrice - totalDiscount
                : totalPrice
            )}{' '}
            ₽
          </span>
        </p>
        <button
          className="btn btn--purple"
          type="submit"
          onClick={handleOrderClick}
          disabled={orderFetchingStatus === RequestStatus.Pending}
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
}
export default OrderDetails;
