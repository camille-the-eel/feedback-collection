import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './App';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// Render root component (App.js) to DOM (index.html in /public dir)
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);

// testing our .env keys
console.log('STRIPE KEY:', process.env.REACT_APP_STRIPE_KEY);
console.log('ENV', process.env.NODE_ENV);