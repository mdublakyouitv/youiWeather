import { REMOVE_WEATHER } from '../shared/const/types';
import { removeItemFromAsyncStore } from '../utils/secureAsyncStorage';

export const removeWeather = id => dispatch => {
  removeItemFromAsyncStore(id);

  return dispatch({
    type: REMOVE_WEATHER,
    id,
  });
};
