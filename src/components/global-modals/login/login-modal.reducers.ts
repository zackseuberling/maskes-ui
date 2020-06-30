const loginModalReducers = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case 'OPEN_LOGIN_MODAL':
      newState['show'] = true;
      return newState;
    case 'HIDE_LOGIN_MODAL':
      newState['show'] = false;
      return newState;
    default:
      return state;
  }
};

export default loginModalReducers;
