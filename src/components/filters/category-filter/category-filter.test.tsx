import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-component';
import { makeFakeStore } from '../../../utils/mocks';
import CategoryFilter from './category-filter';

describe('Component: CategoryFilter', () => {
  it('should render correctly', () => {
    const mockStore = makeFakeStore();

    const { withStoreComponent } = withStore(
      <CategoryFilter activeFilterCategory={null} activeFilterType={[]} />,
      mockStore
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Категория')).toBeInTheDocument();
  });
});
