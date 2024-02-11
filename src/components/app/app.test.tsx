import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeCamera, makeFakeStore } from '../../utils/mocks';
import { AppRoute, RequestStatus } from '../../const';
import ProductPage from '../../pages/product-page/product-page';
import App from './app';

describe('Component: App', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "CatalogPage" when navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push(AppRoute.Catalog);
    const expectedText = 'Каталог фото- и видеотехники';

    render(withStoreComponent);

    expect(mockHistory.location.pathname).toBe('/');
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render "ProductPage" when navigate to "/product/:id"', () => {
    const mockCamera = makeFakeCamera();
    const withHistoryComponent = withHistory(<ProductPage />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        CAMERA: { camera: mockCamera, fetchingStatus: RequestStatus.Success },
      })
    );
    mockHistory.push(AppRoute.Product.replace(':id', String(mockCamera.id)));

    render(withStoreComponent);

    expect(mockHistory.location.pathname).toBe(
      AppRoute.Product.replace(':id', String(mockCamera.id))
    );
    expect(screen.getByTestId('product-page')).toBeInTheDocument();
  });

  it('should render "OrederPage" when navigate to "/order"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push(AppRoute.Order);

    render(withStoreComponent);

    expect(mockHistory.location.pathname).toBe(AppRoute.Order);
    expect(screen.getByTestId('order-page')).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when navigate to unknown route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(
      screen.getByText('Ошибка 404, страница не найдена')
    ).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
