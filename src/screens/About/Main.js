import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { DeviceInfo, FocusManager, FormFactor } from '@youi/react-native-youi';

import { DeviceInfoRow } from '../../components/DeviceInfoRow';

export default class About extends Component {
  state = {
    isFocus: false,
  };

  viewRef = React.createRef();
  buttonRef = React.createRef();

  componentDidMount() {
    FocusManager.setFocusRoot(this.viewRef.current, true);

    setTimeout(() => FocusManager.focus(this.buttonRef.current), 0);
  }

  componentWillUnmount() {
    FocusManager.setFocusRoot(this.viewRef.current, false);
  }

  // TODO: Add focus to ScrollView

  onFocus = () => this.setState({ isFocus: true });

  onBlur = () => this.setState({ isFocus: false });

  goBack = () => this.props.navigation.goBack();

  render() {
    const {
      state: { isFocus },
      onFocus,
      onBlur,
      viewRef,
      buttonRef,
    } = this;

    return (
      <View style={styles.overlay} ref={viewRef}>
        <View style={styles.mainContainer}>
          <Text style={styles.textLarge}>About</Text>
          <View style={styles.textContainer}>
            <ScrollView>
              <View style={styles.textScrollContainer}>
                <DeviceInfoRow
                  label="Device Name"
                  description={DeviceInfo.getDeviceModel()}
                />
                <DeviceInfoRow
                  label="OS Name"
                  description={DeviceInfo.getSystemName()}
                />
                <DeviceInfoRow
                  label="Device Manufacturer"
                  description={DeviceInfo.getDeviceManufacturer()}
                />
                <DeviceInfoRow
                  label="OS Version"
                  description={DeviceInfo.getSystemVersion()}
                />
                <Text style={styles.textSmall}>
                  This is an app to check the weather in different regions and
                  to view the current forcast.
                  {'\n'}
                  {'\n'}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  id leo lobortis, commodo tellus quis, porttitor massa. Proin
                  lectus justo, pretium a turpis in, luctus rhoncus elit. Etiam
                  feugiat, elit ac rhoncus rutrum, lectus tortor fermentum orci,
                  ut pellentesque urna erat sollicitudin velit. Duis et ipsum
                  justo. Nulla faucibus pharetra nulla, a pellentesque est
                  dignissim in. Praesent blandit id leo et eleifend. Nulla vel
                  tristique erat. Suspendisse lacinia, elit in posuere porta,
                  orci elit fermentum felis, vitae eleifend est mi a ipsum.
                  Aenean non velit ut elit pulvinar maximus ac pellentesque
                  enim. Donec mattis odio a libero tincidunt interdum. Praesent
                  convallis orci ligula, id gravida quam faucibus ac. Curabitur
                  ante libero, consequat a ullamcorper id, consectetur vitae
                  lectus. Aenean mollis sapien ex. Proin id tristique erat, vel
                  viverra lacus. Maecenas et dignissim elit. Nam sagittis a erat
                  vitae placerat. Donec eu lorem lectus. Sed non sem nec neque
                  aliquam fermentum. Class aptent taciti sociosqu ad litora
                  torquent per conubia nostra, per inceptos himenaeos.
                </Text>
              </View>
            </ScrollView>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={this.goBack}
              style={[styles.button, isFocus && styles.buttonFocus]}
              onFocus={() => onFocus()}
              onBlur={() => onBlur()}
              ref={buttonRef}
            >
              <Text
                style={[styles.buttonText, isFocus && styles.buttonFocusText]}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  mainContainer: {
    backgroundColor: 'white',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
    borderWidth: 3,
    borderRadius: 14,
    paddingVertical: 20,
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textLarge: { fontSize: FormFactor.isTV ? 50 : 30, padding: 0, margin: 0 },
  textSmall: {
    fontSize: FormFactor.isTV ? 20 : 10,
    marginTop: FormFactor.isTV ? 20 : 10,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 14,
  },
  buttonText: {
    color: 'black',
  },
  buttonFocus: {
    backgroundColor: 'black',
  },
  buttonFocusText: {
    color: 'white',
  },
});
