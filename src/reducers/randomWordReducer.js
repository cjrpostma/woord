import * as actionTypes from '../actionTypes';

export default (state = null, action) => {
  switch (action.type) {
    case actionTypes.FETCH_RANDOM_WORD_SUCCESS:
      return action.randomWord;

    default:
      return state;
  }
};
