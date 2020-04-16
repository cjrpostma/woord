export default async () => {
  const response = await fetch(
    `https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=${process.env.REACT_APP_WORDNIK_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch a random word.');
  }

  const randomWordData = await response.json();

  return randomWordData.word;
};
