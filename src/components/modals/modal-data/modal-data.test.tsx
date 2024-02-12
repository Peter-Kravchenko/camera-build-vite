import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-component';
import { makeFakeStore } from '../../../utils/mocks';
import ModalData from './modal-data';

describe('Component: ModalData', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<ModalData />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('modal-data')).toBeInTheDocument();
  });
});
