import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getWeatherByCityName } from '../../actions/getWeather';
import {
  weatherListByCity,
  weatherError,
  weatherSearching,
} from '../../reducers/weather';

import Main from './Main';

const mapStateToProps = state => ({
  list: weatherListByCity(state),
  error: weatherError(state),
  searching: weatherSearching(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getWeatherByCityName,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
