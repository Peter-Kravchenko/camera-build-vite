import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import Sorting from './sorting';

describe('Component: Sorting', () => {
  it('should render correctly', () => {
    const mockStore = makeFakeStore();
    const { withStoreComponent } = withStore(
      <Sorting activeSortType={null} activeSortOrder={null} />,
      mockStore
    );

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('sorting')).toBeInTheDocument();
    expect(screen.getByText('по цене')).toBeInTheDocument();
    expect(screen.getByText('по популярности')).toBeInTheDocument();
  });
});
