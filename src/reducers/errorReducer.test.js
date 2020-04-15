import * as actionTypes from '../actionTypes';
import errorReducer from './errorReducer';

test('it should return the initial state', () => {
  const expected = null;
  const result = errorReducer(undefined, {});
  expect(result).toEqual(expected);
});

test('it should return state with an error', () => {
  const expected = new Error('There was an error.');
  const result = errorReducer(null, {
    type: actionTypes.SET_ERROR,
    error: expected,
  });
  expect(result).toEqual(expected);
});
