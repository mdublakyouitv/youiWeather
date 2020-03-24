import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FormFactor } from '@youi/react-native-youi';

export const Placeholder = () => (
  <View style={styles.container}>
    <Text style={styles.header}>No weather found!</Text>
    <Text style={styles.description}>Please, add your first location.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: FormFactor.isTV ? 25 : 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: FormFactor.isTV ? 15 : 12,
    marginTop: 10,
  },
});
