import { render, screen } from '@testing-library/react';
import UpButton from './up-button';

describe('Component: UpButton', () => {
  it('should render correctly', () => {
    const preparedComponent = <UpButton />;

    render(preparedComponent);

    expect(screen.getByTestId('up-button')).toBeInTheDocument();
  });
});
