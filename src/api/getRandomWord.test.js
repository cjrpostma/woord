import getRandomWord from './getRandomWord';

const fakeQuery = 'test';

const fakeURL = `${process.env.REACT_APP_BASE_URL}/v4/words.json/randomWord?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=${process.env.REACT_APP_WORDNIK_KEY}`;

const fakeResponse = {
  id: 0,
  word: 'test',
};

const mockFetchSuccessCase = () =>
  jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(fakeResponse),
    })
  );

const mockFetchFailureCase = () =>
  jest.fn().mockImplementation(() => Promise.reject(Error('Failed to fetch.')));

const mockFetchResponseNotOKCase = () =>
  jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: false,
    })
  );

test('it calls fetch with correct url', () => {
  window.fetch = mockFetchSuccessCase();
  getRandomWord();
  expect(window.fetch).toHaveBeenCalledWith(fakeURL);
});

test('it returns a single word as a string', () => {
  window.fetch = mockFetchSuccessCase();
  expect(getRandomWord()).resolves.toEqual(fakeResponse.word);
});

test('it throws when response not ok', () => {
  window.fetch = mockFetchResponseNotOKCase();
  expect(getRandomWord()).rejects.toEqual(
    Error(`Failed to fetch a random word.`)
  );
});

test('it throws when failing to fetch', () => {
  window.fetch = mockFetchFailureCase();
  expect(getRandomWord()).rejects.toEqual(Error(`Failed to fetch.`));
});
