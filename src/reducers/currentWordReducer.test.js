import * as actionTypes from '../actionTypes';
import currentWordReducer from './currentWordReducer';

test('it should return the initial state', () => {
  const expected = null;
  const result = currentWordReducer(undefined, {});
  expect(result).toEqual(expected);
});
