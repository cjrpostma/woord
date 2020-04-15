import * as actionTypes from '../actionTypes';
import errorReducer from './errorReducer';

test('it should return the initial state', () => {
  const expected = null;
  const result = errorReducer(undefined, {});
  expect(result).toEqual(expected);
});
