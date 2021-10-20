import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { store } from './redux/store/store';
import { Provider } from 'react-redux';
import { AppWrapper } from './AppWrapper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <AppWrapper />
    <ToastContainer />
  </React.StrictMode>
  </Provider>,

  document.getElementById('root')
);

