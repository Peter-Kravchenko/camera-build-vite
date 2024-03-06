import { screen, render } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import Header from './header';
import { makeFakeStore } from '../../utils/mocks';

describe('Component: Header', () => {
  it('should render correctly', () => {
    const mockStore = makeFakeStore();
    const { withStoreComponent } = withStore(<Header />, mockStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
