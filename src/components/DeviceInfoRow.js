import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FormFactor } from '@youi/react-native-youi';

export const DeviceInfoRow = ({ label, description }) => (
  <View style={styles.deviceInfo}>
    <Text style={{ ...styles.textMedium, ...styles.leftColumn }}>
      {`${label}:`}
    </Text>
    <Text style={styles.textMedium}>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  deviceInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  leftColumn: {
    textAlign: 'right',
    marginRight: FormFactor.isTV ? 5 : 2,
  },
  textMedium: {
    fontSize: FormFactor.isTV ? 30 : 12,
    width: '50%',
  },
});
