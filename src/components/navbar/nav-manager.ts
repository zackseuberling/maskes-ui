import _ from 'lodash';
import Home from '../../containers/Home/Home';
import GetHelp from '../../containers/GetHelp/GetHelp';
import Volunteer from '../../containers/Volunteer/Volunteer';
import MyRequests from '../../containers/Requests/Requests';
import CreateRequestPage from '../Request/CreateRequest/CreateRequestPage';

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
  if (state.auth.access) {
    return PROTECTED_NAV_STATE[navState] || MyRequests;
  } else {
    return PUBLIC_NAV_STATE[navState] || Home;
  }
}
