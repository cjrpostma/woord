import * as actionTypes from '../actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_USER_WORD:
      return [...state, action.word];

    case actionTypes.ADD_USER_WORD_ATTEMPT:
      return state.map(word => {
        if (word.id === action.wordId) {
          word.userDefinitionAttempts = [
            ...word.userDefinitionAttempts,
            {
              date: action.date,
              definition: action.userDefinition,
            },
          ];
        }
      });

    case actionTypes.DELETE_USER_WORD:
      return state.filter(word => word.id !== action.wordId);

    case actionTypes.SET_USER_WORD_DIFFICULTY:
      return state.map(word => {
        if (word.id === action.wordId) {
          word.difficulty = action.difficulty;
        }
      });

    default:
      return state;
  }
};
