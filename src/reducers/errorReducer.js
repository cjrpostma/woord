import * as actionTypes from '../actionTypes';

export default (state = null, action) => {
  switch (action.type) {
    case actionTypes.SET_ERROR:
      return action.error;

    default:
      return state;
  }
};
