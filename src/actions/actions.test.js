import { v4 as uuidv4 } from 'uuid';
import * as actionTypes from '../actionTypes';
import * as actions from './index';

jest.mock('uuid');

const fakeWord = {
  id: 'abcdefg',
  text: 'fake',
  otherProperty: 'fake',
};

const realDateNow = Date.now.bind(global.Date);
const dateNowStub = jest.fn(() => 1530518207007);
global.Date.now = dateNowStub;
uuidv4.mockImplementation(() => 'abc');

afterEach(() => {
  global.Date.now = realDateNow;
});

test('it should return an action with type FETCH_CURRENT_WORD_SUCCESS and payload of currentWord', () => {
  const expectedAction = {
    type: actionTypes.FETCH_CURRENT_WORD_SUCCESS,
    currentWord: fakeWord,
  };
  const result = actions.fetchCurrentWordSuccess(fakeWord);
  expect(result).toEqual(expectedAction);
});

test('it should return an action with type DELETE_CURRENT_WORD', () => {
  const expectedAction = {
    type: actionTypes.DELETE_CURRENT_WORD,
  };
  const result = actions.deleteCurrentWord();
  expect(result).toEqual(expectedAction);
});

test('it should return an action with type ADD_USER_WORD and payload of word', () => {
  const expectedAction = {
    type: actionTypes.ADD_USER_WORD,
    userWord: {
      id: 'abc',
      word: 'test',
      addedOn: Date.now(),
      userDefinitionAttempts: [],
      definition: 'test definition',
      partOfSpeech: 'noun',
      difficulty: 10,
    },
  };
  const result = actions.addUserWord({
    id: 'abc',
    word: 'test',
    text: 'test definition',
    partOfSpeech: 'noun',
  });
  expect(result).toEqual(expectedAction);
});

test('it should return an action with type ADD_USER_WORD_ATTEMPT and payload of wordId, date, userDefinition', () => {
  const expectedAction = {
    type: actionTypes.ADD_USER_WORD_ATTEMPT,
    wordId: 1,
    attemptedOn: Date.now(),
    attemptedDefinition: 'A made up definition',
  };
  const result = actions.addUserWordAttempt(
    1,
    Date.now(),
    'A made up definition'
  );
  expect(result).toEqual(expectedAction);
});

test('it should return an action with type DELETE_USER_WORD and payload of wordId', () => {
  const expectedAction = {
    type: actionTypes.DELETE_USER_WORD,
    wordId: 1,
  };
  const result = actions.deleteUserWord(1);
  expect(result).toEqual(expectedAction);
});

test('it should return an action with type SET_USER_WORD_DIFFICULTY and payload of wordId, difficulty', () => {
  const expectedAction = {
    type: actionTypes.SET_USER_WORD_DIFFICULTY,
    wordId: 1,
    difficulty: 10,
  };
  const result = actions.setUserWordDifficulty(1, 10);
  expect(result).toEqual(expectedAction);
});

test('it should return an action with type FETCH_RANDOM_WORD_SUCCESS and payload of randomWord', () => {
  const expectedAction = {
    type: actionTypes.FETCH_RANDOM_WORD_SUCCESS,
    randomWord: 'test',
  };
  const result = actions.fetchRandomWordSuccess('test');
  expect(result).toEqual(expectedAction);
});

test('it should return an action with type SET_ERROR and payload of error', () => {
  const expectedAction = {
    type: actionTypes.SET_ERROR,
    error: new Error('Test'),
  };
  const result = actions.setError(new Error('Test'));
  expect(result).toEqual(expectedAction);
});

test('it should return an action with type SET_ISLOADING and payload of loadingStatus', () => {
  const expectedAction = {
    type: actionTypes.SET_IS_LOADING,
    loadingStatus: true,
  };
  const result = actions.setIsLoading(true);
  expect(result).toEqual(expectedAction);
});
