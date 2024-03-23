import cn from 'classnames';
import { useState } from 'react';
import { ValidationMap } from '../../const';
import { TOrders } from '../../types/orders';
import { addSpaceInPrice } from '../../utils/utils';

type OrderSummaryProps = {
  orders: TOrders;
};

function OrderSummary({ orders }: OrderSummaryProps): JSX.Element {
  const [validatePromo, setValidatePromo] = useState(ValidationMap.Idle);

  const totalPrice = 1;
  // const totalPrice = orders.reduce(
  //   (acc, order) =>
  //     order.quantity ? acc + order.price * order.quantity : acc + order.price,
  //   0
  // );

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
                //dispatch применить промокод
              }}
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
            0 ₽
          </span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text basket__summary-text--total">
            К оплате:
          </span>
          <span className="basket__summary-value basket__summary-value--total">
            111 390 ₽
          </span>
        </p>
        <button className="btn btn--purple" type="submit">
          Оформить заказ
        </button>
      </div>
    </div>
  );
}

export default OrderSummary;
