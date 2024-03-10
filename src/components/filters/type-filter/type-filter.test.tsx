import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-component';
import { makeFakeStore } from '../../../utils/mocks';
import TypeFilter from './type-filter';

describe('Component: TypeFilter', () => {
  it('should render correctly', () => {
    const mockStore = makeFakeStore();

    const { withStoreComponent } = withStore(
      <TypeFilter activeFilterType={[]} activeFilterCategory={null} />,
      mockStore
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Тип камеры')).toBeInTheDocument();
  });
});
