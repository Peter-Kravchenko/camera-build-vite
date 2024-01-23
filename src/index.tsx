import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContainer />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
