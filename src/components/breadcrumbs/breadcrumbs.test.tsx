import { render, screen } from '@testing-library/react';
import Breadcrumbs from './breadcrumbs';
import { PageBlock } from '../../const';
import { withHistory } from '../../utils/mock-component';
import { makeFakeCamera } from '../../utils/mocks';

describe('Component: Breadcrumbs', () => {
  it('should render correctly with pageBlock="Catalog"', () => {
    const expectedMainText = 'Главная';
    const expectedCatalogText = 'Каталог';
    const preparedComponent = withHistory(
      <Breadcrumbs pageBlock={PageBlock.Catalog} />
    );

    render(preparedComponent);

    expect(screen.getByText(expectedMainText)).toBeInTheDocument();
    expect(screen.getByText(expectedCatalogText)).toBeInTheDocument();
  });

  it('should render correctly with pageBlock="Camera"', () => {
    const mockCamera = makeFakeCamera();
    const expectedMainText = 'Главная';
    const expectedCatalogText = 'Каталог';
    const expectedCamearaText = mockCamera.name;
    const preparedComponent = withHistory(
      <Breadcrumbs pageBlock={PageBlock.Camera} camera={mockCamera} />
    );

    render(preparedComponent);

    expect(screen.getByText(expectedMainText)).toBeInTheDocument();
    expect(screen.getByText(expectedCatalogText)).toBeInTheDocument();
    expect(screen.getByText(expectedCamearaText)).toBeInTheDocument();
  });

  it('should render correctly with pageBlock="Order"', () => {
    const expectedMainText = 'Главная';
    const expectedCatalogText = 'Каталог';
    const expectedOrderText = 'Корзина';
    const preparedComponent = withHistory(
      <Breadcrumbs pageBlock={PageBlock.Order} />
    );

    render(preparedComponent);

    expect(screen.getByText(expectedMainText)).toBeInTheDocument();
    expect(screen.getByText(expectedCatalogText)).toBeInTheDocument();
    expect(screen.getByText(expectedOrderText)).toBeInTheDocument();
  });
});
