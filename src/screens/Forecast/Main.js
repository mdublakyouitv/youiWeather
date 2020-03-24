import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { FocusManager } from '@youi/react-native-youi';
import { ACTIONS } from '../../utils/const';

import { HeaderTitle } from '../../components/HeaderTitle';
import { BackButton } from '../../components/BackButton';
import { HeaderButtons } from '../../components/HeaderButtons';
import { ForecastInterval } from '../../components/ForecastInterval';

export default class Forecast extends Component {
  constructor(props) {
    super(props);

    this.viewRef = React.createRef();

    this.willFocusSubscription = props.navigation.addListener('willFocus', () =>
      FocusManager.setFocusable(this.viewRef.current, true),
    );

    this.willBlurSubscription = props.navigation.addListener('willBlur', () =>
      FocusManager.setFocusable(this.viewRef.current, false),
    );
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <BackButton navigation={navigation} />,
      headerTitle: <HeaderTitle title={navigation.getParam('city')} />,
      headerRight: <HeaderButtons navigation={navigation} />,
    };
  };

  componentDidMount() {
    const {
      props: { navigation },
      onRefresh,
    } = this;

    navigation.setParams({
      handleRefresh: onRefresh,
    });
  }

  componentWillUnmount() {
    this.willBlurSubscription.remove();

    this.props.actions.clearForecast();
  }

  onRefresh = () => {
    const {
      props: { navigation },
    } = this;

    return navigation.navigate('Splash', {
      action: ACTIONS.GET_FORECAST,
      city: { name: navigation.getParam('city') },
    });
  };

  restructureData = data => [
    { type: 'temps', data: data.main },
    {
      type: 'conditions',
      data: data.weather[0],
    },
    {
      type: 'humidity',
      data: data.main.humidity,
    },
    { type: 'clouds', data: data.clouds },
    { type: 'wind', data: data.wind },
  ];

  render() {
    const {
      props: { data },
      viewRef,
    } = this;

    // TODO: Add focus to view

    return (
      <View style={styles.container} ref={viewRef}>
        <FlatList
          data={data}
          keyExtractor={item => item.dt.toString()}
          renderItem={({ item }) => (
            <ForecastInterval
              timeStamp={item.dt * 1000}
              data={this.restructureData(item)}
              id={item.dt}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
  },
});
