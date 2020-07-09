import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
// import globalModals from '../components/global-modals/login/login-modal.reducers';
import auth from '../components/global-modals/auth/store/reducer/reducer';
import requestList from '../components/manage-requests/manage-request-page/request-table-list/store/reducer/reducer';
import requestDetail from '../components/manage-requests/manage-request-page/view-request-detail/store/reducer/reducer';
import thunk from 'redux-thunk';


const appReducers = combineReducers({
  auth,
  requestList,
  requestDetail,
});

const store = createStore(appReducers, applyMiddleware(logger, thunk));
export default store;
