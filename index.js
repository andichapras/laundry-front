import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import './src/polyfill'

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './src/App';
import * as serviceWorker from './src/serviceWorker';

import { icons } from './src/assets/icons'

import { Provider } from 'react-redux'

import store from './src/store/store'

React.icons = icons

const app = (
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
    
)

ReactDOM.render(
  app, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
