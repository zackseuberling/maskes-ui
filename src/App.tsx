import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import AppRoot from './components/root/AppRoot';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/:navId?/:subNavId?" component={AppRoot}></Route>
      </Router>
    </Provider>
  );
}

export default App;
