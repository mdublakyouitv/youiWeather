import React from 'react';
import { StyleSheet } from 'react-native';
import { FormFactor } from '@youi/react-native-youi';

export const CommonStyles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    borderRadius: 5,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#2196F3',
    ...FormFactor.select({
      TV: { height: 40 },
      Tablet: { height: 30 },
      Handset: { height: 20 },
    }),
  },
  buttonFocus: {
    backgroundColor: 'orange',
  },
  buttonText: {
    flex: 1,
    borderRadius: 5,
    borderRadius: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    ...FormFactor.select({
      TV: { fontSize: 20 },
      Tablet: { fontSize: 15 },
      Handset: { fontSize: 10 },
    }),
  },
  iconMainColor: {
    color: '#f4f3e7',
  },
  iconActiveColor: {
    color: FormFactor.isTV ? '#0a84ff' : '#3DDC84',
  },
});
