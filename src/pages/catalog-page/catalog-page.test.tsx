import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import { RequestStatus } from '../../const';
import CatalogPage from './catalog-page';

describe('Component: CatalogPage', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<CatalogPage />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('catalog-page')).toBeInTheDocument();
    expect(
      screen.getByText('Каталог фото- и видеотехники')
    ).toBeInTheDocument();
  });

  it('should show "Cameras not found" when cameras.length = 0', () => {
    const { withStoreComponent } = withStore(
      <CatalogPage />,
      makeFakeStore({
        CAMERAS: {
          cameras: [],
          fetchingStatus: RequestStatus.Success,
        },
      })
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(
      screen.getByText('Камеры не найдены на сервере')
    ).toBeInTheDocument();
  });
});
