import { ACTIVE_WEATHER } from '../shared/const/types';

export const setActiveWeather = id => dispatch =>
  dispatch({
    type: ACTIVE_WEATHER,
    id,
  });
