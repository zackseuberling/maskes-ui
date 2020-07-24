import { createStore, combineReducers, applyMiddleware } from 'redux';
// import logger from 'redux-logger';
// import globalModals from '../components/global-modals/login/login-modal.reducers';
import auth from '../components/Auth/store/reducer/reducer';
import requestList from '../containers/Requests/RequestList/store/reducer/reducer';
import requestDetail from '../containers/Requests/RequestDetail/store/reducer/reducer';
import volunteerList from '../containers/Volunteer/VolunteerList/store/reducer/reducer';
import volunteerDetail from '../containers/Volunteer/VolunteerDetail/store/reducer/reducer';
import myVolunteer from '../containers/Volunteer/MyVolunteer/store/reducer/reducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


const rootReducer = combineReducers({
  auth,
  requestList,
  requestDetail,
  volunteerList,
  volunteerDetail,
  myVolunteer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;
