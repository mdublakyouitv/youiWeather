import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FormFactor } from '@youi/react-native-youi';

export const Notification = ({ message, style }) => (
  <View style={[styles.container, style]}>
    <Text style={styles.text}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  text: { fontSize: FormFactor.isTV ? 15 : 10, color: '#f4f3e7' },
});
