const authReducers = (state = { hasLogin: false }, action) => {
  const newState = { ...state };
  switch (action.type) {
    case 'SUCCESSFULLY_LOG_IN':
      newState['hasLogin'] = true;
      return newState;
    default:
      return state;
  }
};

export default authReducers;
