import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FormFactor } from '@youi/react-native-youi';
import Icon from 'react-native-vector-icons/Feather';
import { CommonStyles } from '../styles';

export class AboutButton extends Component {
  state = {
    isFocus: false,
  };

  onFocus = () => this.setState({ isFocus: true });

  onBlur = () => this.setState({ isFocus: false });

  render() {
    const {
      props: { navigation },
      state: { isFocus },
      onFocus,
      onBlur,
    } = this;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.buttonStyle, isFocus && styles.buttonFocus]}
        onPress={() => navigation.navigate('About')}
        onFocus={() => onFocus()}
        onBlur={() => onBlur()}
      >
        <Icon
          name="info"
          color={
            isFocus
              ? CommonStyles.iconActiveColor.color
              : CommonStyles.iconMainColor.color
          }
          size={FormFactor.isTV ? 20 : 12}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    padding: FormFactor.isTV ? 5 : 3,
    paddingBottom: 3,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: CommonStyles.iconMainColor.color,
  },
  buttonFocus: {
    backgroundColor: CommonStyles.iconMainColor.color,
  },
});
