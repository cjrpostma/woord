import * as actionTypes from '../actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_USER_WORD:
      return [...state, action.userWord];

    case actionTypes.ADD_USER_WORD_ATTEMPT:
      return state.map(word => {
        if (word.id === action.wordId) {
          word.userDefinitionAttempts = [
            ...word.userDefinitionAttempts,
            {
              attemptedOn: action.attemptedOn,
              attemptedDefinition: action.attemptedDefinition,
            },
          ];
        }
        return word;
      });

    case actionTypes.DELETE_USER_WORD:
      return state.filter(word => word.id !== action.wordId);

    case actionTypes.SET_USER_WORD_DIFFICULTY:
      return state.map(word => {
        if (word.id === action.wordId) {
          word.difficulty = action.difficulty;
        }
        return word;
      });

    default:
      return state;
  }
};
