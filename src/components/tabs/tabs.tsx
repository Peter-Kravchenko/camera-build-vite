import { useState } from 'react';
import { TCamera } from '../../types/cameras';
import { AppRoute, Tab } from '../../const';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

type TabsProps = {
  camera: TCamera;
};

function Tabs({ camera }: TabsProps): JSX.Element {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<string>(Tab.Description);

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button
          onClick={() => {
            setActiveTab(Tab.Characteristics);
            navigate(
              `${AppRoute.Product.replace(':id', String(camera.id))}/?tab=cha`
            );
          }}
          className={cn('tabs__control', {
            'is-active': activeTab === Tab.Characteristics,
          })}
          type="button"
        >
          Характеристики
        </button>
        <button
          onClick={() => {
            setActiveTab(Tab.Description);
            navigate(
              `${AppRoute.Product.replace(':id', String(camera.id))}/?tab=des`
            );
          }}
          className={cn('tabs__control', {
            'is-active': activeTab === Tab.Description,
          })}
          type="button"
        >
          Описание
        </button>
      </div>
      <div className="tabs__content">
        <div
          className={cn('tabs__element', {
            'is-active': activeTab === Tab.Characteristics,
          })}
        >
          <ul className="product__tabs-list">
            <li className="item-list">
              <span className="item-list__title">Артикул:</span>{' '}
              <p className="item-list__text">{camera.vendorCode}</p>
            </li>
            <li className="item-list">
              <span className="item-list__title">Категория:</span>
              <p className="item-list__text">{camera.category}</p>
            </li>
            <li className="item-list">
              <span className="item-list__title">Тип камеры:</span>
              <p className="item-list__text">{camera.type}</p>
            </li>
            <li className="item-list">
              <span className="item-list__title">Уровень:</span>
              <p className="item-list__text">{camera.level}</p>
            </li>
          </ul>
        </div>
        <div
          className={cn('tabs__element', {
            'is-active': activeTab === Tab.Description,
          })}
        >
          <div className="product__tabs-text">
            <p>{camera.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
