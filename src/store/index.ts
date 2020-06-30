import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
// import navReducers from './nav';

// const appReducers = combineReducers({ navReducers });

const byId = (state = {}, action) => {
  // console.log('inside byId reducer redux', state, action);
  return state;
};

const navReducers = combineReducers({ byId });

const store = createStore(navReducers, applyMiddleware(logger));
export default store;
