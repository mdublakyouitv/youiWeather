import {
  SEARCH_WEATHER_INIT,
  SEARCH_WEATHER_SUCCESS,
  SEARCH_WEATHER_FAIL,
  REMOVE_WEATHER,
  ACTIVE_WEATHER,
} from '../shared/const/types';
import { dissoc, isEmpty } from 'ramda';

export const initialState = {
  data: null,
  error: null,
  searching: false,
  selectedCity: null,
};

export const weather = (state = initialState, action = {}) => {
  switch (action.type) {
    case SEARCH_WEATHER_INIT:
      return {
        ...state,
        searching: true,
      };
    case SEARCH_WEATHER_SUCCESS:
      const reducedList = action.data.reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: item,
        }),
        state.data,
      );

      return {
        ...state,
        data: reducedList,
        selectedCity:
          action.selectedCity || Number(Object.keys(reducedList)[0]),
        searching: false,
      };
    case SEARCH_WEATHER_FAIL:
      return {
        ...state,
        error: action.error,
        searching: false,
      };
    case ACTIVE_WEATHER:
      return {
        ...state,
        selectedCity: action.id,
      };
    case REMOVE_WEATHER:
      const updatedList = dissoc(action.id, state.data);

      return {
        ...initialState,
        data: updatedList,
        selectedCity: isEmpty(updatedList)
          ? null
          : Number(Object.keys(updatedList)[0]),
      };
    default:
      return state;
  }
};

export const weatherList = state => Object.values(state.weather.data);
export const weatherListByCity = state =>
  weatherList(state).map(item => item.name);
export const weatherListById = state => Object.keys(state.weather.data);
export const weatherError = state => state.weather.error;
export const weatherSearching = state => state.weather.searching;
export const selectedCity = state => state.weather.selectedCity;
