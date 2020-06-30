import React from 'react';
import './App.css';
import AppRoot from './components/AppRoot';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppRoot />
        {/* <Route path="/(" component={AppRoot}></Route>
        <Route path="/:navId?" component={AppRoot}></Route>
        <Route path="/:navId?" component={AppRoot}></Route> */}
      </Router>
    </Provider>
  );
}

export default App;
