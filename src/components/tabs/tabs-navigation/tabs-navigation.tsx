import cn from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoute, Tab } from '../../../const';
import { TCamera } from '../../../types/cameras';
import { useEffect } from 'react';
import { getTabName } from '../../../utils/utils';

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
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get('tab');
    const parsedTab = pageParam ? pageParam : Tab.Description;
    const isValid =
      parsedTab === Tab.Characteristics || parsedTab === Tab.Description;

    if (parsedTab !== activeTab) {
      if (isValid) {
        setActiveTab(parsedTab);
      } else {
        navigate(AppRoute.NotFound);
      }
    }
  }, [activeTab, setActiveTab, navigate, location]);

  return (
    <div className="tabs__controls product__tabs-controls">
      {Object.values(Tab).map((tab) => (
        <button
          key={tab}
          onClick={() => {
            setActiveTab(tab);
            navigate(
              `${AppRoute.Product.replace(':id', String(camera.id))}/?tab=${
                tab === Tab.Characteristics
                  ? Tab.Characteristics
                  : Tab.Description
              }`
            );
          }}
          className={cn('tabs__control', {
            'is-active': activeTab === tab,
          })}
          type="button"
        >
          {getTabName(tab)}
        </button>
      ))}
    </div>
  );
}

export default TabsNavigation;
