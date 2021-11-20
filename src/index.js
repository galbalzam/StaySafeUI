import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { store } from './redux/store/store';
import { Provider } from 'react-redux';
import { AppWrapper } from './AppWrapper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppWrapper />
    </Provider>
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById('root')
);
