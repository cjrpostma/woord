import { v4 as uuidv4 } from 'uuid';
import * as actionTypes from '../actionTypes';

// current word ------------------------------
export const fetchCurrentWordSuccess = currentWord => ({
  type: actionTypes.FETCH_CURRENT_WORD_SUCCESS,
  currentWord,
});

export const deleteCurrentWord = () => ({
  type: actionTypes.DELETE_CURRENT_WORD,
});

// user word ------------------------------
export const addUserWord = word => ({
  type: actionTypes.ADD_USER_WORD,
  userWord: {
    id: uuidv4(),
    word: word.word,
    addedOn: Date.now(),
    userDefinitionAttempts: [],
    definition: word.text,
    partOfSpeech: word.partOfSpeech,
    difficulty: 10,
  },
});

export const addUserWordAttempt = (wordId, attemptedDefinition) => ({
  type: actionTypes.ADD_USER_WORD_ATTEMPT,
  wordId,
  attemptedOn: Date.now(),
  attemptedDefinition,
});

export const deleteUserWord = wordId => ({
  type: actionTypes.DELETE_USER_WORD,
  wordId,
});

export const setUserWordDifficulty = (wordId, difficulty) => ({
  type: actionTypes.SET_USER_WORD_DIFFICULTY,
  wordId,
  difficulty,
});

// random word ------------------------------
export const fetchRandomWordSuccess = randomWord => ({
  type: actionTypes.FETCH_RANDOM_WORD_SUCCESS,
  randomWord,
});

// error ------------------------------
export const setError = error => ({
  type: actionTypes.SET_ERROR,
  error,
});

// loading ------------------------------
export const setIsLoading = loadingStatus => ({
  type: actionTypes.SET_IS_LOADING,
  loadingStatus,
});
