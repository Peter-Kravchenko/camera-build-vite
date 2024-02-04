import cn from 'classnames';
import { useState } from 'react';
import { Tab } from '../../../const';
import { TCamera } from '../../../types/cameras';
import TabsNavigation from '../tabs-navigation/tabs-navigation';

type TabsDataProps = {
  camera: TCamera;
};

function TabsData({ camera }: TabsDataProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Description);

  return (
    <div className="tabs product__tabs">
      <TabsNavigation
        camera={camera}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
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

export default TabsData;
