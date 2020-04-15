import * as actionTypes from '../actionTypes';
import randomWordReducer from './randomWordReducer';

test('it should return the initial state', () => {
  const expected = null;
  const result = randomWordReducer(undefined, {});
  expect(result).toEqual(expected);
});
