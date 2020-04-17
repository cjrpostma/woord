import * as actionTypes from '../actionTypes';
import currentWordReducer from './currentWordReducer';

test('it should return the initial state', () => {
  const expected = null;
  const result = currentWordReducer(undefined, {});
  expect(result).toEqual(expected);
});

test('it should return state with a new word', () => {
  const expected = {
    id: 'M5486200-2',
    partOfSpeech: 'noun',
    attributionText:
      'from The American Heritage® Dictionary of the English Language, 5th Edition.',
    sourceDictionary: 'ahd-5',
    text:
      'Any of numerous small rodents of the families Muridae and Cricetidae, such as the house mouse, characteristically having a pointed snout, small rounded ears, and a long naked or almost hairless tail.',
    sequence: '2',
    score: 0,
    labels: [],
    citations: [],
    word: 'mouse',
    relatedWords: [],
    exampleUses: [],
    textProns: [],
    notes: [],
    attributionUrl: 'https://ahdictionary.com/',
    wordnikUrl: 'https://www.wordnik.com/words/mouse',
  };
  const result = currentWordReducer(null, {
    type: actionTypes.FETCH_CURRENT_WORD_SUCCESS,
    currentWord: expected,
  });
  expect(result).toEqual(expected);
});

test('it should return state as null', () => {
  const currentState = {
    id: 'M5486200-2',
    partOfSpeech: 'noun',
    attributionText:
      'from The American Heritage® Dictionary of the English Language, 5th Edition.',
    sourceDictionary: 'ahd-5',
    text:
      'Any of numerous small rodents of the families Muridae and Cricetidae, such as the house mouse, characteristically having a pointed snout, small rounded ears, and a long naked or almost hairless tail.',
    sequence: '2',
    score: 0,
    labels: [],
    citations: [],
    word: 'mouse',
    relatedWords: [],
    exampleUses: [],
    textProns: [],
    notes: [],
    attributionUrl: 'https://ahdictionary.com/',
    wordnikUrl: 'https://www.wordnik.com/words/mouse',
  };
  const expected = null;
  const result = currentWordReducer(currentState, {
    type: actionTypes.DELETE_CURRENT_WORD,
  });
  expect(result).toEqual(expected);
});
