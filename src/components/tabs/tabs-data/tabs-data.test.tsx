import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-component';
import { makeFakeCamera } from '../../../utils/mocks';
import TabsData from './tabs-data';

describe('Component: TabsNavigation', () => {
  it('should render correctly', () => {
    const mockCamera = makeFakeCamera();
    const { withStoreComponent } = withStore(<TabsData camera={mockCamera} />);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('tabs-data')).toBeInTheDocument();
  });
});
