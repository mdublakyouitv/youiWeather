import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FormFactor, FocusManager } from '@youi/react-native-youi';
import { WEATHER_ICON_STYLE_1, ACTIONS } from '../utils/const';
import { CommonStyles } from '../styles';

import { Spinner } from '../components/Spinner';
import { WeatherIcon } from '../components/WeatherIcon';

const FOCUS_TYPES = {
  item: 'ITEM',
  delete: 'DELETE',
  cancel: 'CANCEL',
};

const RENDER_MODE = {
  cardView: 'cardView',
  editView: 'editView',
};

export class CurrentWeather extends Component {
  state = {
    renderMode: RENDER_MODE.cardView,
    isItemFocus: false,
    isButtonDeleteFocus: false,
    isButtonCancelFocus: false,
  };

  itemRef = React.createRef();
  editViewRef = React.createRef();
  cancelButtonRef = React.createRef();

  componentDidMount() {
    setTimeout(
      () =>
        this.props.city.id === this.props.selected &&
        FocusManager.focus(this.itemRef.current),
      0,
    );
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.selected !== this.props.selected &&
      this.props.city.id === this.props.selected
    ) {
      FocusManager.focus(this.itemRef.current);
    }
  }

  toggleFocus = (type, isFocus) => {
    type === FOCUS_TYPES.item
      ? this.setState({ isItemFocus: isFocus })
      : type === FOCUS_TYPES.delete
      ? this.setState({ isButtonDeleteFocus: isFocus })
      : this.setState({ isButtonCancelFocus: isFocus });
  };

  onPress = () => {
    if (this.props.isRefresh) {
      return;
    }

    this.props.onSelect(this.props.city.id);

    setTimeout(
      () =>
        this.props.navigation.navigate('Splash', {
          action: ACTIONS.GET_FORECAST,
          city: this.props.city,
        }),
      300,
    );
  };

  onLongPress = () => {
    if (this.props.isRefresh) {
      return;
    }

    this.setState({ renderMode: RENDER_MODE.editView }, () => {
      FocusManager.setFocusRoot(this.editViewRef.current, true);

      setTimeout(() => FocusManager.focus(this.cancelButtonRef.current), 0);
    });
  };

  onEditCancel = () => {
    FocusManager.setFocusRoot(this.editViewRef.current, false);

    this.setState({ renderMode: RENDER_MODE.cardView }, () =>
      setTimeout(() => FocusManager.focus(this.itemRef.current), 0),
    );
  };

  onEditDelete = () => this.props.onRemove(this.props.city.id);

  renderCardView = () => {
    const {
      props: { city, isRefresh },
      state: { isItemFocus },
      onPress,
      onLongPress,
      toggleFocus,
      itemRef,
    } = this;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        onLongPress={onLongPress}
        onFocus={() => toggleFocus(FOCUS_TYPES.item, true)}
        onBlur={() => toggleFocus(FOCUS_TYPES.item, false)}
        style={[
          styles.item,
          styles.weatherContainer,
          isItemFocus && styles.itemFocus,
        ]}
        ref={itemRef}
      >
        {isRefresh ? (
          <Spinner />
        ) : (
          <View>
            <View style={styles.cityContainer}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.titleText}
              >
                {city.name}
              </Text>
            </View>
            <View style={styles.temperatureContainer}>
              <WeatherIcon
                type={WEATHER_ICON_STYLE_1}
                name={city.weather_icon}
                color="white"
                size={FormFactor.isTV ? 100 : 40}
              />
              <Text style={styles.temperatureText}>{city.temp}˚C</Text>
            </View>
            <View style={styles.weatherDescription}>
              <Text style={styles.mediumText}>{city.weather_description}</Text>
              <Text style={styles.smallText}>
                min: {city.temp_lo}˚C / max: {city.temp_hi}˚C
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  renderEditView = () => {
    const {
      state: { isItemFocus, isButtonDeleteFocus, isButtonCancelFocus },
      onEditDelete,
      onEditCancel,
      toggleFocus,
      editViewRef,
      cancelButtonRef,
    } = this;

    return (
      <View
        style={[
          styles.item,
          styles.editContainer,
          isItemFocus && styles.itemFocus,
        ]}
        onFocus={() => toggleFocus(FOCUS_TYPES.item, true)}
        onBlur={() => toggleFocus(FOCUS_TYPES.item, false)}
        ref={editViewRef}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            CommonStyles.button,
            styles.button,
            isButtonDeleteFocus && CommonStyles.buttonFocus,
          ]}
          onPress={onEditDelete}
          onFocus={() => toggleFocus(FOCUS_TYPES.delete, true)}
          onBlur={() => toggleFocus(FOCUS_TYPES.delete, false)}
        >
          <Text style={CommonStyles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            CommonStyles.button,
            styles.button,
            isButtonCancelFocus && CommonStyles.buttonFocus,
          ]}
          onPress={onEditCancel}
          onFocus={() => toggleFocus(FOCUS_TYPES.cancel, true)}
          onBlur={() => toggleFocus(FOCUS_TYPES.cancel, false)}
          ref={cancelButtonRef}
        >
          <Text style={CommonStyles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderByMode = () => ({
    cardView: this.renderCardView(),
    editView: this.renderEditView(),
  });

  render() {
    const { renderMode } = this.state;

    return (
      <View style={styles.parentContainer}>
        {this.renderByMode()[renderMode]}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    paddingHorizontal: FormFactor.isTV ? 10 : 5,
    paddingVertical: FormFactor.isTV ? '15%' : '15%',
    alignSelf: 'center',
  },
  item: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    minWidth: FormFactor.isTV ? 500 : 180,
    maxWidth: FormFactor.isTV ? 500 : 180,
    alignItems: 'center',
  },
  editContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F3F3',
  },
  weatherContainer: {
    backgroundColor: FormFactor.isTV ? '#009038' : '#249EFF',
  },
  itemFocus: {
    backgroundColor: '#3DDC84',
  },
  cityContainer: {
    alignItems: 'center',
  },
  temperatureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: FormFactor.isTV ? 20 : 10,
  },
  temperatureText: {
    color: '#FFFFFF',
    fontSize: FormFactor.isTV ? 80 : 30,
    marginLeft: FormFactor.isTV ? 20 : 10,
  },
  weatherDescription: {
    alignItems: 'center',
  },
  titleText: {
    fontSize: FormFactor.isTV ? 60 : 25,
    color: '#FFFFFF',
  },
  mediumText: {
    fontSize: FormFactor.isTV ? 35 : 20,
    color: '#FFFFFF',
  },
  smallText: {
    fontSize: FormFactor.isTV ? 25 : 12,
    color: '#FFFFFF',
    marginTop: FormFactor.isTV ? 25 : 15,
  },
  button: {
    width: '70%',
    marginVertical: 20,
  },
});
