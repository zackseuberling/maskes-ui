import Home from '../home/Home';
import GetHelp from '../get-help/GetHelp';
import Volunteer from '../volunteer/Volunteer';
import MyRequests from '../manage-requests/ManageRequests';

const PUBLIC_NAV_STATE = {
  'get-help': GetHelp,
  home: Home,
  volunteer: Volunteer,
};

const PROTECTED_NAV_STATE = {};

export function getDisplayComponentForNav(state, navId) {
  if (state.auth.hasLogin) {
    return PROTECTED_NAV_STATE[navId] || MyRequests;
  } else {
    return PUBLIC_NAV_STATE[navId] || Home;
  }
}
