import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import globalModals from '../components/global-modals/login/login-modal.reducers';
import auth from '../apis/auth/auth.reducers';

const appReducers = combineReducers({
  auth,
  globalModals,
});

const store = createStore(appReducers, applyMiddleware(logger));
export default store;
