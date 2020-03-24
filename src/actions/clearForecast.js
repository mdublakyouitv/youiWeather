import { CLEAR_FORECAST } from '../shared/const/types';

export const clearForecast = () => dispatch =>
  dispatch({ type: CLEAR_FORECAST });
