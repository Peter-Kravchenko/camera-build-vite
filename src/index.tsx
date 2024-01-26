import { ToastContainer } from 'react-toastify';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './components/app/app';
import { fetchCameras, fetchPromos } from './store/api-actions';

import 'react-toastify/dist/ReactToastify.css';

store.dispatch(fetchCameras());
store.dispatch(fetchPromos());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer autoClose={2000} />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
