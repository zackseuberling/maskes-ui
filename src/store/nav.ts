import { combineReducers } from 'redux';

const byId = (state = {}, action) => {
  // console.log('inside byId reducer redux', state, action);
  return state;
};

const navReducers = combineReducers({ byId });

export default navReducers;
