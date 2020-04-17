export default async query => {
  const response = await fetch(
    `https://api.wordnik.com/v4/word.json/${query}/definitions?limit=2&api_key=${process.env.REACT_APP_WORDNIK_KEY}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch definition for ${query}.`);
  }

  const wordData = await response.json();
  let currentWord;
  if (wordData.length > 1) {
    currentWord = wordData.find(word => word.text);
  } else if (Array.isArray(wordData)) {
    currentWord = wordData[0];
  }
  return currentWord;
};
