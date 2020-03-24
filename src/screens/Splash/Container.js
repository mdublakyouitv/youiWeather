import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getWeatherByCityName,
  getWeatherByGroup,
} from '../../actions/getWeather';
import { getForecast } from '../../actions/getForecast';

import Main from './Main';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getWeatherByGroup,
      getForecast,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
