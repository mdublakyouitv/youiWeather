import {
  OPEN_WEATHER_BASE_URL,
  DEFAULT_UNITS,
  OPEN_WEATHER_API_KEY,
  OPEN_WEATHER_CURRENT_CONDITIONS_ENDPOINT,
  OPEN_WEATHER_CURRENT_CONDITIONS_GROUP_ENDPOINT,
  OPEN_WEATHER_5DAY_FORECAST_ENDPOINT,
} from './const';

const fetchWeatherData = (type, query) => {
  const url = encodeURI(
    `${OPEN_WEATHER_BASE_URL}${type}?${query}&units=${DEFAULT_UNITS}&appid=${OPEN_WEATHER_API_KEY}`,
  );

  return fetch(url).then(response => {
    if (!response.ok) {
      if (response.status == 404) {
        throw new Error(`No weather data found for this city`);
      } else {
        throw new Error(`Request failed [${response.status}]`);
      }
    }

    return response.json();
  });
};

export const fetchCurrentWeatherByCityName = cityName => {
  const query = `q=${cityName}`;

  return fetchWeatherData(OPEN_WEATHER_CURRENT_CONDITIONS_ENDPOINT, query);
};

export const fetchCurrentWeatherByGroup = ids => {
  const query = `id=${ids.join(',')}`;

  return fetchWeatherData(
    OPEN_WEATHER_CURRENT_CONDITIONS_GROUP_ENDPOINT,
    query,
  );
};

export const fetchWeatherForecast = (cityName, country) => {
  const countryCode = country && `,${country}`;
  const query = `q=${cityName}${countryCode}`;

  return fetchWeatherData(OPEN_WEATHER_5DAY_FORECAST_ENDPOINT, query);
};
