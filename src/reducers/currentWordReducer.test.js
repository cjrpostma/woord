import * as actionTypes from '../actionTypes';
import currentWordReducer from './currentWordReducer';

test('it should return the initial state', () => {
  const expected = null;
  const result = currentWordReducer(undefined, {});
  expect(result).toEqual(expected);
});

// test('it should return state with a new word', () => {
//   const expected = 'test';

//   const result = currentWordReducer(null, {
//     type: actionTypes.FETCH_CURRENT_WORD_SUCCESS,
//     currentWord: 'test',
//   });
//   expect(result).toEqual(expected);
// });
