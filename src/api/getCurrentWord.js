import { cleanWordData } from '../utils';

export default async query => {
  const response = await fetch(
    `https://api.wordnik.com/v4/word.json/${query}/definitions?limit=2&api_key=${process.env.REACT_APP_WORDNIK_KEY}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch definition for ${query}.`);
  }

  const wordData = await response.json();

  const currentWord = cleanWordData(wordData);

  return currentWord;
};
