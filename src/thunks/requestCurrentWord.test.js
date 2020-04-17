import { requestCurrentWord } from './requestCurrentWord';
import { fetchCurrentWordSuccess, setError, setIsLoading } from '../actions';

let fakeURL;
let fakeQuery;
let fakeCurrentWord;
let mockDispatch;

beforeEach(() => {
  fakeQuery = 'test';
  fakeURL = `https://api.wordnik.com/v4/word.json/${fakeQuery}/definitions?limit=2&api_key=${process.env.REACT_APP_WORDNIK_KEY}`;
  fakeCurrentWord = [
    {
      id: 'T5136900-1',
      partOfSpeech: 'noun',
      text:
        'A procedure for critical evaluation; a means of determining the presence, quality, or truth of something; a trial.',
      sequence: '1',
      score: 0,
      word: 'test',
    },
  ];
  mockDispatch = jest.fn();
  window.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(fakeCurrentWord),
    })
  );
});

test('it calls dispatch with setLoading(true)', () => {
  const thunk = requestCurrentWord('test');
  thunk(mockDispatch);
  expect(mockDispatch).toHaveBeenCalledWith(setIsLoading(true));
});

test('it calls fetch with the correct arguments', () => {
  const thunk = requestCurrentWord('test');
  thunk(mockDispatch);
  expect(window.fetch).toHaveBeenCalledWith(fakeURL);
});

test('it should dispatch setError if response not ok', async () => {
  window.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: false,
    })
  );

  const thunk = requestCurrentWord('test');
  await thunk(mockDispatch);
  expect(mockDispatch).toHaveBeenCalledWith(
    setError(Error('Failed to fetch definition for test.'))
  );
  expect(mockDispatch).toHaveBeenCalledWith(setIsLoading(false));
});

test('it should dispatch setIsLoading(false) if response ok', async () => {
  const thunk = requestCurrentWord('test');
  await thunk(mockDispatch);
  expect(mockDispatch).toHaveBeenCalledWith(setIsLoading(false));
});

test('it should dispatch fetchCurrentWordSuccess with correct argument', async () => {
  const thunk = requestCurrentWord('test');
  await thunk(mockDispatch);
  expect(mockDispatch).toHaveBeenCalledWith(setIsLoading(true));
  expect(mockDispatch).toHaveBeenCalledWith(
    fetchCurrentWordSuccess(fakeCurrentWord[0])
  );
  expect(mockDispatch).toHaveBeenCalledWith(setIsLoading(false));
  expect(mockDispatch).toHaveBeenCalledWith(setError(null));
});
