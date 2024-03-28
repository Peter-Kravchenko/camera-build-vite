import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import TabsNavigation from './tabs-navigation';
import { Tab } from '../../../const';
import { withHistory, withStore } from '../../../utils/mock-component';
import { makeFakeCamera } from '../../../utils/mocks';

describe('Component: TabsNavigation', () => {
  it('should render correctly', () => {
    const mockCamera = makeFakeCamera();
    const { withStoreComponent } = withStore(
      <TabsNavigation
        camera={mockCamera}
        activeTab={Tab.Description}
        setActiveTab={() => null}
      />
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('tabs-navigation')).toBeInTheDocument();
  });
});
