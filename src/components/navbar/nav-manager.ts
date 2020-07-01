import _ from 'lodash';
import Home from '../home/Home';
import GetHelp from '../get-help/GetHelp';
import Volunteer from '../volunteer/Volunteer';
import MyRequests from '../manage-requests/manage-request-page/ManageRequests';
import CreateRequestPage from '../manage-requests/create-request-page/CreateRequestPage';

const PUBLIC_NAV_STATE = {
  'get-help': GetHelp,
  home: Home,
  volunteer: Volunteer,
};

// TODO: handle full nav state here
const PROTECTED_NAV_STATE = {
  'create-request': CreateRequestPage,
};

export function getDisplayComponentForNav(state, { navId, subNavId }) {
  const navState = _.defaultTo(subNavId, navId);
  if (state.auth.hasLogin) {
    return PROTECTED_NAV_STATE[navState] || MyRequests;
  } else {
    return PUBLIC_NAV_STATE[navState] || Home;
  }
}
