import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CommonStyles } from '../styles';

export const AddButton = React.forwardRef(
  ({ isFocus, onPress, onFocus, onBlur }, ref) => (
    <TouchableOpacity
      ref={ref}
      activeOpacity={0.8}
      style={[
        CommonStyles.button,
        styles.button,
        isFocus && CommonStyles.buttonFocus,
      ]}
      onPress={onPress}
      onFocus={() => onFocus()}
      onBlur={() => onBlur()}
    >
      <Text style={[CommonStyles.buttonText, styles.buttonText]}>Add City</Text>
    </TouchableOpacity>
  ),
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 0,
  },
});
