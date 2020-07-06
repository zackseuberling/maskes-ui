import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
// import globalModals from '../components/global-modals/login/login-modal.reducers';
import auth from '../components/global-modals/auth/store/reducer/reducer';


const appReducers = combineReducers({
  auth,
});

const store = createStore(appReducers, applyMiddleware(logger));
export default store;
