import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { FormFactor } from '@youi/react-native-youi';
import { DEFAULT_CITIES, ACTIONS } from '../../utils/const';
import { getKeysFromAsyncStore } from '../../utils/secureAsyncStorage';
import { isEmpty } from 'ramda';

export default class Splash extends Component {
  springValue = new Animated.Value(0.3);

  componentDidMount() {
    this.spring();

    this.takeAction();
  }

  spring() {
    this.springValue.setValue(0.3);

    Animated.loop(
      Animated.spring(this.springValue, {
        toValue: 1,
        friction: 1,
      }),
    ).start();
  }

  takeAction = () => {
    const { navigation } = this.props;
    const action = navigation.getParam('action', null);

    switch (action) {
      case ACTIONS.GET_FORECAST:
        const city = navigation.getParam('city', {});

        this.getForecast(city);
        break;
      default:
        getKeysFromAsyncStore().then(keys => {
          const ids = isEmpty(keys)
            ? DEFAULT_CITIES.map(item => item.id)
            : keys;

          return this.getWeather(ids);
        });
    }
  };

  getWeather = data =>
    this.props.actions
      .getWeatherByGroup(data)
      .then(() =>
        setTimeout(() => this.props.navigation.navigate('Home'), 1000),
      );

  getForecast = ({ cityName, country = '' }) =>
    this.props.actions.getForecast(cityName, country).then(() =>
      setTimeout(
        () =>
          this.props.navigation.navigate('Forecast', {
            city: cityName,
          }),
        1000,
      ),
    );

  render() {
    return (
      <View style={styles.container}>
        <Animated.Image
          style={[
            styles.image,
            {
              transform: [{ scale: this.springValue }],
            },
          ]}
          source={{
            uri: 'res://drawable/default/splash.png',
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: FormFactor.isTV ? 275 : 75,
    width: FormFactor.isTV ? 275 : 75,
    resizeMode: 'contain',
  },
});
