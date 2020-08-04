import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';

const app = (
  <Provider store={store}>
    <Router>
      <Route path="/:navId?/:subNavId?/:subSubNavId?/" component={App}></Route>
    </Router>
  </Provider>
);

ReactDOM.render(
  // <React.StrictMode>
  app,
  // </React.StrictMode>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
