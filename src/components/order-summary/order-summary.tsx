import cn from 'classnames';
import { useEffect, useState } from 'react';
import { RequestStatus, ValidationMap } from '../../const';
import { TOrders } from '../../types/orders';
import { addSpaceInPrice } from '../../utils/utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postCoupon, postOrder } from '../../store/api-actions';
import {
  getCoupon,
  getCouponFetchingStatus,
  getOrderFetchingStatus,
} from '../../store/order-data/order-data.selectors';
import {
  clearBasket,
  resetCouponFetchingStatus,
  resetOrderFetchingStatus,
} from '../../store/order-data/order-data.slice';
import { toast } from 'react-toastify';
import { openOrderSuccessModal } from '../../store/modal-process/modal-process.slice';

type OrderSummaryProps = {
  orders: TOrders;
};

function OrderSummary({ orders }: OrderSummaryProps): JSX.Element {
  const dispatch = useAppDispatch();
  const coupon = useAppSelector(getCoupon);

  const [couponValue, setCouponValue] = useState(coupon?.coupon || '');
  const [validatePromo, setValidatePromo] = useState(ValidationMap.Idle);

  const totalPrice = orders.reduce(
    (acc, order) =>
      order.quantity ? acc + order.price * order.quantity : acc + order.price,
    0
  );

  const totalDiscount = coupon
    ? Math.round((totalPrice / 100) * coupon.discount)
    : 0;

  console.log(coupon);

  const couponFetchingStatus = useAppSelector(getCouponFetchingStatus);
  const orderFetchingStatus = useAppSelector(getOrderFetchingStatus);

  useEffect(() => {
    if (couponFetchingStatus === RequestStatus.Success) {
      setValidatePromo(ValidationMap.Success);
    }
    if (couponFetchingStatus === RequestStatus.Rejected) {
      setValidatePromo(ValidationMap.Error);
    }

    dispatch(resetCouponFetchingStatus());
  }, [couponFetchingStatus, dispatch]);

  useEffect(() => {
    if (orderFetchingStatus === RequestStatus.Success) {
      //  dispatch(clearBasket());
      toast.success('Заказ успешно оформлен');
      dispatch(openOrderSuccessModal());
    }

    dispatch(resetOrderFetchingStatus());
  }, [orderFetchingStatus, dispatch]);

  return (
    <div className="basket__summary">
      <div className="basket__promo">
        <p className="title title--h4">
          Если у вас есть промокод на скидку, примените его в этом поле
        </p>
        <div className="basket-form">
          <form action="#">
            <div
              className={cn('custom-input', {
                'is-valid': validatePromo === ValidationMap.Success,
                'is-invalid': validatePromo === ValidationMap.Error,
              })}
            >
              <label>
                <span className="custom-input__label">Промокод</span>
                <input
                  type="text"
                  name="promo"
                  placeholder="Введите промокод"
                  value={couponValue}
                  onChange={(e) => {
                    const validValue = e.target.value
                      .replaceAll(' ', '')
                      .toLowerCase();
                    setCouponValue(validValue);
                  }}
                />
              </label>
              <p className="custom-input__error">Промокод неверный</p>
              <p className="custom-input__success">Промокод принят!</p>
            </div>
            <button
              className="btn"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                dispatch(postCoupon(couponValue));
              }}
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
          <span className="basket__summary-value basket__summary-value--bonus">
            {coupon ? addSpaceInPrice(totalDiscount) : 0} ₽
          </span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text basket__summary-text--total">
            К оплате:
          </span>
          <span className="basket__summary-value basket__summary-value--total">
            {addSpaceInPrice(coupon ? totalPrice - totalDiscount : totalPrice)}{' '}
            ₽
          </span>
        </p>
        <button
          className="btn btn--purple"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            dispatch(
              postOrder({
                camerasIds: orders.map((order) => order.id),
                coupon: couponValue,
              })
            );
          }}
          disabled={orderFetchingStatus === RequestStatus.Pending}
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
}
export default OrderSummary;
