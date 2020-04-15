import * as actionTypes from '../actionTypes';

export default (state = false, action) => {
  switch (action.type) {
    case actionTypes.SET_IS_LOADING:
      return action.loadingStatus;

    default:
      return state;
  }
};
