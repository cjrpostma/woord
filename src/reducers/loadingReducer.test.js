import * as actionTypes from '../actionTypes';
import loadingReducer from './loadingReducer';

test('it should return the initial state', () => {
  const expected = false;
  const result = loadingReducer(undefined, {});
  expect(result).toEqual(expected);
});
