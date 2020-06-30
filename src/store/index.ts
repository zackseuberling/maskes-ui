import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';

const appReducers = combineReducers({});

const store = createStore(appReducers, applyMiddleware(logger));
export default store;
