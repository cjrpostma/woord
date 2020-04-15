import { fetchRandomWordSuccess, setError, setIsLoading } from '../actions';
import getRandomWord from '../api/getRandomWord';

export const requestRandomWord = () => async dispatch => {
  try {
    dispatch(setIsLoading(true));
    const randomWord = await getRandomWord();
    dispatch(fetchRandomWordSuccess(randomWord));
    dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setIsLoading(false));
    dispatch(setError(error));
  }
};
