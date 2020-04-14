import * as actionTypes from '../actionTypes';

export default (state = false, action) => {
  switch (action.type) {
    case actionTypes.SET_ISLOADING:
      return action.loadingStatus;

    default:
      return state;
  }
};
