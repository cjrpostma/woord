import { combineReducers } from 'redux';

import currentWordReducer from './currentWordReducer';
import errorReducer from './errorReducer';
import loadingReducer from './loadingReducer';
import randomWordReducer from './randomWordReducer';
import userWordReducer from './userWordReducer';

const rootReducer = combineReducers({
  currentWord: currentWordReducer,
  error: errorReducer,
  isLoading: loadingReducer,
  randomWord: randomWordReducer,
  userWords: userWordReducer,
});

export default rootReducer;
