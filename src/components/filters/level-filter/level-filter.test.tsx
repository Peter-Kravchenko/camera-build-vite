import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-component';
import { makeFakeStore } from '../../../utils/mocks';
import LevelFilter from './level-filter';

describe('Component: LevelFilter', () => {
  it('should render correctly', () => {
    const mockStore = makeFakeStore();
    const { withStoreComponent } = withStore(
      <LevelFilter activeFilterLevel={[]} />,
      mockStore
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Уровень')).toBeInTheDocument();
  });
});
