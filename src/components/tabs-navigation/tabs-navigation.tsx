import { useNavigate } from 'react-router-dom';
import { AppRoute, Tab } from '../../const';
import cn from 'classnames';
import { TCamera } from '../../types/cameras';

type TabsNavigationProps = {
  camera: TCamera;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
};

function TabsNavigation({
  camera,
  activeTab,
  setActiveTab,
}: TabsNavigationProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="tabs__controls product__tabs-controls">
      {Object.values(Tab).map((tab) => (
        <button
          key={tab}
          onClick={() => {
            setActiveTab(tab);
            navigate(
              `${AppRoute.Product.replace(':id', String(camera.id))}/?tab=${
                tab === Tab.Characteristics ? 'cha' : 'des'
              }`
            );
          }}
          className={cn('tabs__control', {
            'is-active': activeTab === tab,
          })}
          type="button"
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default TabsNavigation;
