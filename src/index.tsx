import { ToastContainer } from 'react-toastify';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchCameras, fetchPromos } from './store/api-actions';
import HistoryRouter from './components/history-route/history-route';
import App from './components/app/app';

import 'react-toastify/dist/ReactToastify.css';
import browserHistory from './browser-history';
import { loadOrder } from './store/order-data/order-data.slice';

store.dispatch(fetchCameras());
store.dispatch(fetchPromos());
store.dispatch(loadOrder());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer autoClose={2000} />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
