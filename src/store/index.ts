import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import globalModals from '../components/global-modals/login/login-modal.reducers';

const appReducers = combineReducers({
  globalModals,
});

const store = createStore(appReducers, applyMiddleware(logger));
export default store;
