import * as actionTypes from '../actionTypes';

export default (state = null, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CURRENT_WORD_SUCCESS:
      return action.currentWord;

    default:
      return state;
  }
};
