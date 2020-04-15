import { requestRandomWord } from './requestRandomWord';
import { fetchRandomWordSuccess, setError, setIsLoading } from '../actions';

let fakeURL;
let fakeRandomWord;
let mockDispatch;

beforeEach(() => {
  fakeURL = `${process.env.REACT_APP_BASE_URL}/v4/words.json/randomWord?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=${process.env.REACT_APP_WORDNIK_KEY}`;
  fakeRandomWord = 'test';
  mockDispatch = jest.fn();
  window.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(fakeRandomWord),
    })
  );
});

test('it calls dispatch with setLoading(true)', () => {
  const thunk = requestRandomWord();
  thunk(mockDispatch);
  expect(mockDispatch).toHaveBeenCalledWith(setIsLoading(true));
});

test('it calls fetch with the correct arguments', () => {
  const thunk = requestRandomWord();
  thunk(mockDispatch);
  expect(window.fetch).toHaveBeenCalledWith(fakeURL);
});

test('it should dispatch setError if response not ok', async () => {
  window.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: false,
    })
  );

  const thunk = requestRandomWord();
  await thunk(mockDispatch);
  expect(mockDispatch).toHaveBeenCalledWith(setIsLoading(false));
  expect(mockDispatch).toHaveBeenCalledWith(
    setError(Error('Failed to fetch a random word.'))
  );
});

test('it should dispatch setIsLoading(false) if response ok', async () => {
  const thunk = requestRandomWord();
  await thunk(mockDispatch);
  expect(mockDispatch).toHaveBeenCalledWith(setIsLoading(false));
});

test('it should dispatch fetchRandomWordSuccess with correct argument', async () => {
  const thunk = requestRandomWord();
  await thunk(mockDispatch);
  expect(mockDispatch).toHaveBeenCalledWith(setIsLoading(true));
  expect(mockDispatch).toHaveBeenCalledWith(
    fetchRandomWordSuccess(fakeRandomWord.word)
  );
  expect(mockDispatch).toHaveBeenCalledWith(setIsLoading(false));
});
