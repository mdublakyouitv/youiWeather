import {
  SEARCH_WEATHER_INIT,
  SEARCH_WEATHER_SUCCESS,
  SEARCH_WEATHER_FAIL,
} from '../shared/const/types';
import {
  fetchCurrentWeatherByCityName,
  fetchCurrentWeatherByGroup,
} from '../utils/openWeatherService';
import { setItemInAsyncStore } from '../utils/secureAsyncStorage';

const getWeatherInit = () => ({
  type: SEARCH_WEATHER_INIT,
});

const getWeatherSuccess = data => ({
  type: SEARCH_WEATHER_SUCCESS,
  data,
});

const getWeatherSuccessForItem = data => ({
  type: SEARCH_WEATHER_SUCCESS,
  data,
  selectedCity: data[0].id,
});

const getWeatherFail = error => ({
  type: SEARCH_WEATHER_FAIL,
  error,
});

const parseCity = city => ({
  id: city.id,
  name: city.name,
  country: city.sys.country,
  coord: city.coord,
  temp: city.main.temp.toFixed(0),
  temp_lo: city.main.temp_min.toFixed(0),
  temp_hi: city.main.temp_max.toFixed(0),
  humidity: city.main.humidity,
  weather_description: city.weather[0].description,
  weather_icon: city.weather[0].icon,
  wind_speed: city.wind.speed,
  cloud_cover: city.clouds.all,
});

export const getWeatherByCityName = cityName => dispatch => {
  dispatch(getWeatherInit());

  return fetchCurrentWeatherByCityName(cityName)
    .then(data => {
      const parseData = parseCity(data);

      setItemInAsyncStore(parseData);

      return dispatch(getWeatherSuccessForItem([parseData]));
    })
    .catch(({ message }) => dispatch(getWeatherFail(message)));
};

export const getWeatherByGroup = idsList => dispatch => {
  dispatch(getWeatherInit());

  return fetchCurrentWeatherByGroup(idsList)
    .then(({ list }) => dispatch(getWeatherSuccess(list.map(parseCity))))
    .catch(({ message }) => dispatch(getWeatherFail(message)));
};
