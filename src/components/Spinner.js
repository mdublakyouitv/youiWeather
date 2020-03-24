import React, { Component } from 'react';
import { StyleSheet, Animated, Easing, View } from 'react-native';
import { FormFactor } from '@youi/react-native-youi';

export class Spinner extends Component {
  spinValue = new Animated.Value(0);

  componentDidMount() {
    this.spin();
  }

  spin() {
    this.spinValue.setValue(0);

    Animated.loop(
      Animated.timing(this.spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.ease,
      }),
    ).start();
  }

  render() {
    const {
      props: { size },
    } = this;
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <View style={styles.container}>
        <Animated.Image
          style={{
            transform: [{ rotate: spin }],
            height: size ? size : styles.image.height,
            width: size ? size : styles.image.width,
          }}
          source={{ uri: 'res://drawable/default/splash.png' }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: FormFactor.isTV ? 100 : 75,
    width: FormFactor.isTV ? 100 : 75,
  },
});
