import * as actionTypes from '../actionTypes';
import * as actions from './index';

const fakeWord = {
  id: 'abcdefg',
  text: 'fake',
  otherProperty: 'fake',
};

const dateNowStub = jest.fn(() => 1530000000000);

test('it should return an action with type FETCH_CURRENT_WORD_SUCCESS and payload of currentWord', () => {
  const expectedAction = {
    type: actionTypes.FETCH_CURRENT_WORD_SUCCESS,
    currentWord: fakeWord,
  };
  const result = actions.fetchCurrentWordSuccess(fakeWord);
  expect(result).toEqual(expectedAction);
});

test('it should return an action with type ADD_USER_WORD and payload of word', () => {
  const expectedAction = {
    type: actionTypes.ADD_USER_WORD,
    word: fakeWord,
  };
  const result = actions.addUserWord(fakeWord);
  expect(result).toEqual(expectedAction);
});

test('it should return an action with type ADD_USER_WORD_ATTEMPT and payload of wordId, date, userDefinition', () => {
  const expectedAction = {
    type: actionTypes.ADD_USER_WORD_ATTEMPT,
    wordId: 1,
    attemptedOn: dateNowStub,
    attemptedDefinition: 'A made up definition',
  };
  const result = actions.addUserWordAttempt(
    1,
    dateNowStub,
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
  const result = actions.fetchRandomWord('test');
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
    type: actionTypes.SET_ISLOADING,
    loadingStatus: true,
  };
  const result = actions.setIsLoading(true);
  expect(result).toEqual(expectedAction);
});
