import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FormFactor } from '@youi/react-native-youi';

import { AboutButton } from './AboutButton';
import { RefreshButton } from './RefreshButton';

export const HeaderButtons = ({ navigation }) => (
  <View style={styles.container}>
    <RefreshButton navigation={navigation} />
    <AboutButton navigation={navigation} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: FormFactor.isHandset ? -20 : 0,
  },
});
