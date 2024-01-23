import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import Layout from '../layout/layout';
import ProductPage from '../../pages/product-page/product-page';
import OrderPage from '../../pages/order-page/order-page';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Catalog} element={<Layout />}>
          <Route index element={<CatalogPage />} />
          <Route path={AppRoute.Product} element={<ProductPage />} />
          <Route path={AppRoute.Order} element={<OrderPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
