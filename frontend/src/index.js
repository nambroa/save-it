import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import 'bootstrap/dist/css/bootstrap.css';

import App from './components/App';
import reducers from './reducers';

// Creates a redux store and hooks the middleware redux thunk to it. This allows redux thunk to allow the developer to
// return functions inside of the action creators. Thunk calls this functions with dispatch and getstate as params.
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

// The <Provider> component makes the Redux store available to any nested components that need to access it.
ReactDOM.render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  document.getElementById('root')
);
