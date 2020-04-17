export const getTodayFormatted = () => {
  const d = new Date();

  const today = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ][d.getDay()];

  const day = d.getDate();

  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ][d.getMonth()];

  return `${today}, ${month} ${day}`;
};

export const wait = (amount = 0) =>
  new Promise(resolve => setTimeout(resolve, amount));

export const cleanWordData = wordData => {
  if (wordData.length > 1) {
    return wordData.find(word => word.text);
  }
  if (Array.isArray(wordData)) {
    return wordData[0];
  }
};
