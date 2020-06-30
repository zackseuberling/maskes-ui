import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import AppRoot from './components/AppRoot';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppRoot />
      </Router>
    </Provider>
  );
}

export default App;
