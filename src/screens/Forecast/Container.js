import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { clearForecast } from '../../actions/clearForecast';
import {
  forecastList,
  forecastError,
  forecastSearching,
} from '../../reducers/forecast';

import Main from './Main';

const mapStateToProps = state => ({
  data: forecastList(state),
  error: forecastError(state),
  searching: forecastSearching(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      clearForecast,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
