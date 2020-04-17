import getCurrentWord from './getCurrentWord';

const fakeQuery = 'test';

const fakeURL = `https://api.wordnik.com/v4/word.json/${fakeQuery}/definitions?limit=2&api_key=${process.env.REACT_APP_WORDNIK_KEY}`;

const fakeResponse = [
  {
    id: 'abcdefg-1',
    partOfSpeech: 'noun',
  },
  {
    id: 'abcdefg-3',
    partOfSpeech: 'noun',
    text: 'A test response.',
  },
];

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
  getCurrentWord(fakeQuery);
  expect(window.fetch).toHaveBeenCalledWith(fakeURL);
});

test('it returns a single word object only if it has a "text" property', () => {
  window.fetch = mockFetchSuccessCase();
  const expected = fakeResponse.find(word => word.text);
  expect(getCurrentWord(fakeQuery)).resolves.toEqual(expected);
});

test('it throws when response not ok', () => {
  window.fetch = mockFetchResponseNotOKCase();
  expect(getCurrentWord(fakeQuery)).rejects.toEqual(
    Error(`Failed to fetch definition for ${fakeQuery}.`)
  );
});

test('it throws when failing to fetch', () => {
  window.fetch = mockFetchFailureCase();
  expect(getCurrentWord(fakeQuery)).rejects.toEqual(Error(`Failed to fetch.`));
});
