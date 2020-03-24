import {
  SEARCH_FORECAST_INIT,
  SEARCH_FORECAST_SUCCESS,
  SEARCH_FORECAST_FAIL,
  CLEAR_FORECAST,
} from '../shared/const/types';

export const initialState = {
  data: null,
  error: null,
  searching: false,
};

export const forecast = (state = initialState, action = {}) => {
  switch (action.type) {
    case SEARCH_FORECAST_INIT:
      return {
        ...state,
        searching: true,
      };
    case SEARCH_FORECAST_SUCCESS:
      return {
        ...state,
        data: action.data,
        searching: false,
      };
    case SEARCH_FORECAST_FAIL:
      return {
        ...state,
        error: action.error,
        searching: false,
      };
    case CLEAR_FORECAST:
      return initialState;
    default:
      return state;
  }
};

export const forecastList = state => state.forecast.data;
export const forecastError = state => state.forecast.error;
export const forecastSearching = state => state.forecast.searching;
