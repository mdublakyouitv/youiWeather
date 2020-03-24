import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FormFactor } from '@youi/react-native-youi';
import Icon from 'react-native-vector-icons/Feather';

export const HeaderTitle = ({ icon, color, title }) => (
  <View style={styles.container}>
    {icon && (
      <Icon name={icon} color={color} size={FormFactor.isTV ? 30 : 15} />
    )}
    <Text style={styles.title}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...FormFactor.select({
      TV: { fontSize: 30 },
      Tablet: { fontSize: 20 },
      Handset: { fontSize: 10, marginBottom: 20 },
    }),
    marginLeft: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
