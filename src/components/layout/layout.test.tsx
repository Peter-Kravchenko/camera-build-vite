import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import Layout from './layout';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';

describe('Component: Layout', () => {
  it('should render correctly', () => {
    const mockStore = makeFakeStore();
    const { withStoreComponent } = withStore(<Layout />, mockStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });
});
