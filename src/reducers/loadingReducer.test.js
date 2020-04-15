import * as actionTypes from '../actionTypes';
import loadingReducer from './loadingReducer';

test('it should return the initial state', () => {
  const expected = false;
  const result = loadingReducer(undefined, {});
  expect(result).toEqual(expected);
});

test('it should return state with a new loading status', () => {
  const expected = true;
  const result = loadingReducer(false, {
    type: actionTypes.SET_ISLOADING,
    loadingStatus: true,
  });
  expect(result).toEqual(expected);
});
