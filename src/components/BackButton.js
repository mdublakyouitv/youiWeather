import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FormFactor } from '@youi/react-native-youi';
import Icon from 'react-native-vector-icons/Feather';
import { CommonStyles } from '../styles';

export class BackButton extends Component {
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.buttonStyle, isFocus && styles.buttonFocus]}
          onPress={() => navigation.goBack()}
          onFocus={() => onFocus()}
          onBlur={() => onBlur()}
        >
          <Icon
            name="arrow-left"
            color={
              isFocus
                ? CommonStyles.iconActiveColor.color
                : CommonStyles.iconMainColor.color
            }
            size={FormFactor.isTV ? 20 : 12}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    // marginLeft: FormFactor.isTV ? 10 : 5,
    marginTop: FormFactor.isHandset ? -18 : 5,
  },
  buttonStyle: {
    padding: FormFactor.isTV ? 5 : 3,
    paddingBottom: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  buttonFocus: {
    backgroundColor: CommonStyles.iconMainColor.color,
    borderColor: CommonStyles.iconMainColor.color,
  },
});
