import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import Footer from './footer';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const preparedComponent = withHistory(<Footer />);

    render(preparedComponent);

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
