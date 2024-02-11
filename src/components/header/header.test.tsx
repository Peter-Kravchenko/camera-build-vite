import { screen, render } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import Header from './header';

describe('Component: Header', () => {
  it('should render correctly', () => {
    const preparedComponent = withHistory(<Header />);

    render(preparedComponent);

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
