import {
  SEARCH_FORECAST_INIT,
  SEARCH_FORECAST_SUCCESS,
  SEARCH_FORECAST_FAIL,
} from '../shared/const/types';
import { fetchWeatherForecast } from '../utils/openWeatherService';

const getForecastInit = () => ({
  type: SEARCH_FORECAST_INIT,
});

const getForecastSuccess = data => ({
  type: SEARCH_FORECAST_SUCCESS,
  data,
});

const getForecastFail = error => ({
  type: SEARCH_FORECAST_FAIL,
  error,
});

export const getForecast = (cityName, country) => dispatch => {
  dispatch(getForecastInit());

  return fetchWeatherForecast(cityName, country)
    .then(({ list }) => dispatch(getForecastSuccess(list)))
    .catch(({ message }) => dispatch(getForecastFail(message)));
};
