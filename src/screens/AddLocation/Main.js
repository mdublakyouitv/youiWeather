import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { FormFactor, FocusManager } from '@youi/react-native-youi';
import Icon from 'react-native-vector-icons/Feather';
import { CommonStyles } from '../../styles';
import { ERROR_MESSAGE_DUPLICATE_LOCATION } from '../../utils/const';
import { SEARCH_WEATHER_FAIL } from '../../shared/const/types';

import { Spinner } from '../../components/Spinner';
import { Notification } from '../../components/Notification';

const FOCUS_TYPES = {
  CLOSE: 'CLOSE',
  INPUT: 'INPUT',
  SUBMIT: 'SUBMIT',
};

export default class AddLocation extends Component {
  state = {
    city: '',
    isButtonCloseFocus: false,
    isInputFocus: false,
    isButtonSubmitFocus: false,
    showNotification: false,
    notification: '',
  };

  viewRef = React.createRef();
  inputRef = React.createRef();

  componentDidMount() {
    FocusManager.setFocusRoot(this.viewRef.current, true);

    setTimeout(() => FocusManager.focus(this.inputRef.current), 0);
  }

  componentWillUnmount() {
    FocusManager.setFocusRoot(this.viewRef.current, false);
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  onSubmit = () => {
    const {
      props: {
        actions: { getWeatherByCityName },
        list,
        navigation,
      },
      state: { city },
    } = this;

    this.setState({ showNotification: false, notification: '' });

    if (list.map(item => item.toLowerCase()).includes(city.toLowerCase())) {
      this.setState({
        showNotification: true,
        notification: ERROR_MESSAGE_DUPLICATE_LOCATION,
      });

      return;
    }

    getWeatherByCityName(city).then(response => {
      if (response.type === SEARCH_WEATHER_FAIL) {
        this.setState({ showNotification: true });

        return;
      }

      navigation.navigate('Home');
    });
  };

  toggleFocus = (type, isFocus) => {
    type === FOCUS_TYPES.CLOSE &&
      this.setState({ isButtonCloseFocus: isFocus });
    type === FOCUS_TYPES.INPUT && this.setState({ isInputFocus: isFocus });
    type === FOCUS_TYPES.SUBMIT &&
      this.setState({ isButtonSubmitFocus: isFocus });
  };

  render() {
    const {
      props: { searching, error },
      state: {
        city,
        isButtonCloseFocus,
        isButtonSubmitFocus,
        isInputFocus,
        showNotification,
        notification,
      },
      onSubmit,
      toggleFocus,
      viewRef,
      inputRef,
    } = this;

    const shouldDisableSubmit = searching || city.length === 0;

    return (
      <View style={styles.container} ref={viewRef}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.closeButton,
            isButtonCloseFocus && styles.closeButtonFocus,
          ]}
          onPress={this.goBack}
          onFocus={() => toggleFocus(FOCUS_TYPES.CLOSE, true)}
          onBlur={() => toggleFocus(FOCUS_TYPES.CLOSE, false)}
        >
          <Icon
            name="x"
            size={FormFactor.isTV ? 30 : 20}
            color={isButtonCloseFocus ? 'white' : '#2196F3'}
          />
        </TouchableOpacity>

        <Text style={styles.title}>Enter location name:</Text>

        <View
          style={[
            styles.input,
            isInputFocus && styles.inputFocus,
            showNotification && styles.inputError,
          ]}
        >
          <TextInput
            placeholder="City"
            value={city}
            onChangeText={city => this.setState({ city: city })}
            disabled={searching}
            onFocus={() => toggleFocus(FOCUS_TYPES.INPUT, true)}
            onBlur={() => toggleFocus(FOCUS_TYPES.INPUT, false)}
            ref={inputRef}
          />

          {showNotification && (
            <Notification
              message={error || notification}
              style={styles.notification}
            />
          )}
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            CommonStyles.button,
            styles.submitButton,
            isButtonSubmitFocus && styles.submitButtonFocus,
            searching && CommonStyles.button,
          ]}
          onPress={onSubmit}
          disabled={shouldDisableSubmit}
          onFocus={() => toggleFocus(FOCUS_TYPES.SUBMIT, true)}
          onBlur={() => toggleFocus(FOCUS_TYPES.SUBMIT, false)}
        >
          <Text style={[CommonStyles.buttonText, styles.buttonText]}>
            Submit
          </Text>

          {searching && (
            <View style={styles.spinner}>
              <Spinner size={FormFactor.isTV ? 30 : 20} />
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: FormFactor.isTV ? 30 : 15,
    paddingHorizontal: FormFactor.isTV ? 10 : 5,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: FormFactor.isTV ? 40 : 14,
    color: '#444',
    textAlign: 'center',
    marginVertical: FormFactor.isTV ? 20 : 10,
  },
  input: {
    alignSelf: 'center',
    height: 40,
    width: '80%',
    padding: 10,
    marginVertical: FormFactor.isTV ? 20 : 10,
    marginHorizontal: 10,
    borderColor: '#2196F3',
    borderWidth: 1,
    fontSize: FormFactor.isTV ? 20 : 14,
    position: 'relative',
  },
  inputFocus: {
    borderColor: 'orange',
  },
  inputError: {
    borderColor: 'red',
  },
  notification: {
    top: 40,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    // alignSelf: 'flex-start',
    // alignItems: 'center',
    // alignContent: 'center',
    // justifyContent: 'center',
    padding: FormFactor.isTV ? 5 : 3,
    paddingBottom: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  closeButtonFocus: {
    backgroundColor: '#2196F3',
  },
  submitButton: {
    width: FormFactor.isTV ? '30%' : '60%',
    alignSelf: 'center',
    position: 'relative',
    marginTop: FormFactor.isTV ? 20 : 10,
  },
  submitButtonFocus: {
    backgroundColor: CommonStyles.buttonFocus.backgroundColor,
  },
  spinner: {
    position: 'relative',
  },
});
