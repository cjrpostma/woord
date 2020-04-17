import * as actionTypes from '../actionTypes';
import userWordReducer from './userWordReducer';

const dateNowStub = jest.fn(() => 1530000000000);
const setFakeInitialState = () => [
  {
    id: 'abcdefg',
    word: 'test1',
    addedOn: dateNowStub,
    userDefinitionAttempts: [
      {
        attemptedOnDate: dateNowStub,
        attemptedDefinition: 'user definition',
      },
    ],
    definition: 'dictionary definition',
    partOfSpeech: 'noun',
    difficulty: 7,
  },
  {
    id: 'hijklm',
    word: 'test2',
    addedOn: dateNowStub,
    userDefinitionAttempts: [
      {
        attemptedOnDate: dateNowStub,
        attemptedDefinition: 'user definition',
      },
    ],
    definition: 'dictionary definition',
    partOfSpeech: 'noun',
    difficulty: 10,
  },
];

test('it should return the initial state', () => {
  const expected = [];
  const result = userWordReducer(undefined, {});
  expect(result).toEqual(expected);
});

test('it should return state with new a word', () => {
  const expected = [
    {
      id: '123',
      word: '123',
      addedOn: dateNowStub,
      userDefinitionAttempts: [],
      definition: 'dictionary definition',
      partOfSpeech: 'noun',
      difficulty: 1,
    },
  ];

  const result = userWordReducer([], {
    type: actionTypes.ADD_USER_WORD,
    userWord: {
      id: '123',
      word: '123',
      addedOn: dateNowStub,
      userDefinitionAttempts: [],
      definition: 'dictionary definition',
      partOfSpeech: 'noun',
      difficulty: 1,
    },
  });
  expect(result).toEqual(expected);
});

test('it should return state with another new word', () => {
  const expected = [
    ...setFakeInitialState(),
    {
      id: '123',
      word: '123',
      addedOn: dateNowStub,
      userDefinitionAttempts: [],
      definition: 'dictionary definition',
      partOfSpeech: 'noun',
      difficulty: 1,
    },
  ];
  const result = userWordReducer(setFakeInitialState(), {
    type: actionTypes.ADD_USER_WORD,
    userWord: {
      id: '123',
      word: '123',
      addedOn: dateNowStub,
      userDefinitionAttempts: [],
      definition: 'dictionary definition',
      partOfSpeech: 'noun',
      difficulty: 1,
    },
  });
  expect(result).toEqual(expected);
});

test('it should return state with new userDefinitionAttempts', () => {
  const expected = [
    {
      id: '123',
      word: '123',
      addedOn: dateNowStub,
      userDefinitionAttempts: [
        {
          attemptedOn: dateNowStub,
          attemptedDefinition: 'user definition',
        },
      ],
      definition: 'dictionary definition',
      partOfSpeech: 'noun',
      difficulty: 1,
    },
  ];
  const result = userWordReducer(
    [
      {
        id: '123',
        word: '123',
        addedOn: dateNowStub,
        userDefinitionAttempts: [],
        definition: 'dictionary definition',
        partOfSpeech: 'noun',
        difficulty: 1,
      },
    ],
    {
      type: actionTypes.ADD_USER_WORD_ATTEMPT,
      wordId: '123',
      attemptedOn: dateNowStub,
      attemptedDefinition: 'user definition',
    }
  );
  expect(result).toEqual(expected);
});

test('it should return state with another new userDefinitionAttempts', () => {
  const expected = [
    {
      id: '123',
      word: '123',
      addedOn: dateNowStub,
      userDefinitionAttempts: [
        {
          attemptedOn: dateNowStub,
          attemptedDefinition: 'user definition',
        },
        {
          attemptedOn: dateNowStub,
          attemptedDefinition: 'other user definition',
        },
      ],
      definition: 'dictionary definition',
      partOfSpeech: 'noun',
      difficulty: 1,
    },
  ];
  const result = userWordReducer(
    [
      {
        id: '123',
        word: '123',
        addedOn: dateNowStub,
        userDefinitionAttempts: [
          {
            attemptedOn: dateNowStub,
            attemptedDefinition: 'user definition',
          },
        ],
        definition: 'dictionary definition',
        partOfSpeech: 'noun',
        difficulty: 1,
      },
    ],
    {
      type: actionTypes.ADD_USER_WORD_ATTEMPT,
      wordId: '123',
      attemptedOn: dateNowStub,
      attemptedDefinition: 'other user definition',
    }
  );
  expect(result).toEqual(expected);
});

test('it should return state with a word deleted', () => {
  const expected = [
    {
      id: 'abcdefg',
      word: 'test1',
      addedOn: dateNowStub,
      userDefinitionAttempts: [
        {
          attemptedOnDate: dateNowStub,
          attemptedDefinition: 'user definition',
        },
      ],
      definition: 'dictionary definition',
      partOfSpeech: 'noun',
      difficulty: 7,
    },
  ];
  const result = userWordReducer(setFakeInitialState(), {
    type: actionTypes.DELETE_USER_WORD,
    wordId: 'hijklm',
  });

  expect(result).toEqual(expected);
});

test('it should return state with a new word difficulty', () => {
  const expected = [
    {
      id: 'abcdefg',
      word: 'test1',
      addedOn: dateNowStub,
      userDefinitionAttempts: [
        {
          attemptedOnDate: dateNowStub,
          attemptedDefinition: 'user definition',
        },
      ],
      definition: 'dictionary definition',
      partOfSpeech: 'noun',
      difficulty: 10,
    },
    {
      id: 'hijklm',
      word: 'test2',
      addedOn: dateNowStub,
      userDefinitionAttempts: [
        {
          attemptedOnDate: dateNowStub,
          attemptedDefinition: 'user definition',
        },
      ],
      definition: 'dictionary definition',
      partOfSpeech: 'noun',
      difficulty: 10,
    },
  ];
  const result = userWordReducer(setFakeInitialState(), {
    type: actionTypes.SET_USER_WORD_DIFFICULTY,
    wordId: 'abcdefg',
    difficulty: 10,
  });
  expect(result).toEqual(expected);
});
