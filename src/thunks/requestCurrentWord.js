import { fetchCurrentWordSuccess, setError, setIsLoading } from '../actions';
import getCurrentWord from '../api/getCurrentWord';

export const requestCurrentWord = query => async dispatch => {
  try {
    dispatch(setIsLoading(true));
    const currentWord = await getCurrentWord(query);
    dispatch(fetchCurrentWordSuccess(currentWord));
    dispatch(setIsLoading(false));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setIsLoading(false));
    dispatch(setError(error));
  }
};
