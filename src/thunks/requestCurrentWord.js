import { fetchCurrentWordSuccess, setError, setIsLoading } from '../actions';
import getCurrentWord from '../api/getCurrentWord';

export const requestCurrentWord = query => async dispatch => {
  try {
    dispatch(setIsLoading(true));
    const word = await getCurrentWord(query);
    dispatch(fetchCurrentWordSuccess(word));
    dispatch(setIsLoading(false));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setIsLoading(false));
    dispatch(setError(error));
  }
};
