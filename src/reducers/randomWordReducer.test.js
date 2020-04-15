import * as actionTypes from '../actionTypes';
import randomWordReducer from './randomWordReducer';

test('it should return the initial state', () => {
  const expected = null;
  const result = randomWordReducer(undefined, {});
  expect(result).toEqual(expected);
});

test('it should return state with a new word', () => {
  const expected = 'test';
  const result = randomWordReducer(null, {
    type: actionTypes.FETCH_RANDOM_WORD_SUCCESS,
    randomWord: 'test',
  });
  expect(result).toEqual(expected);
});
