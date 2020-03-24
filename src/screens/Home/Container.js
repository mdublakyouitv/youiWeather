import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getWeatherByCityName,
  getWeatherByGroup,
} from '../../actions/getWeather';
import { removeWeather } from '../../actions/removeWeather';
import { setActiveWeather } from '../../actions/setActiveWeather';
import {
  weatherList,
  weatherError,
  weatherSearching,
  selectedCity,
  weatherListById,
} from '../../reducers/weather';

import Main from './Main';

const mapStateToProps = state => ({
  data: weatherList(state),
  error: weatherError(state),
  searching: weatherSearching(state),
  selectedCity: selectedCity(state),
  listOfCities: weatherListById(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getWeatherByCityName,
      getWeatherByGroup,
      removeWeather,
      setActiveWeather,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
