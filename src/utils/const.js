export const OPEN_WEATHER_BASE_URL =
  'https://api.openweathermap.org/data/2.5/';
export const OPEN_WEATHER_ICONS_BASE_URL =
  'https://openweathermap.org/img/wn/';
export const OPEN_WEATHER_CURRENT_CONDITIONS_ENDPOINT = 'weather';
export const OPEN_WEATHER_CURRENT_CONDITIONS_GROUP_ENDPOINT = 'group';
export const OPEN_WEATHER_5DAY_FORECAST_ENDPOINT = 'forecast';

export const OPEN_WEATHER_API_KEY =
  '1e08a24aa7b0bcf8d0fdcc706bb75531';
export const DEFAULT_UNITS = 'metric';

export const DEFAULT_CITIES = [
  {
    id: 6094817,
    name: 'Ottawa',
    country: 'CA',
    lat: null,
    lon: null,
  },
  {
    id: 5368361,
    name: 'Los Angeles',
    country: 'US',
    lat: null,
    lon: null,
  },
];

export const WEATHER_ICON_STYLE_1 = 1;
export const WEATHER_ICON_STYLE_2 = 2;
export const DEFAULT_WEATHER_ICON_STYLE = WEATHER_ICON_STYLE_2;

export const ERROR_MESSAGE_LOST_CONNECTION =
  'Lost Network Connection';
export const ERROR_MESSAGE_DUPLICATE_LOCATION =
  'Location already exists';

export const ACTIONS = {
  GET_FORECAST: 'GET_FORECAST',
};
