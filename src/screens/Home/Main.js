import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { FocusManager } from '@youi/react-native-youi';
import { isEmpty, isNil } from 'ramda';

import { HeaderTitle } from '../../components/HeaderTitle';
import { HeaderButtons } from '../../components/HeaderButtons';
import { CurrentWeather } from '../../components/CurrentWeather';
import { Placeholder } from '../../components/Placeholder';
import { AddButton } from '../../components/AddButton';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      selectedItem: null,
      isButtonFocus: false,
      notificationVisible: false,
      notificationError: '',
    };

    this.viewRef = React.createRef();
    this.buttonRef = React.createRef();

    this.willFocusSubscription = props.navigation.addListener('willFocus', () =>
      FocusManager.setFocusable(this.viewRef.current, true),
    );

    this.willBlurSubscription = props.navigation.addListener('willBlur', () =>
      FocusManager.setFocusable(this.viewRef.current, false),
    );
  }

  static navigationOptions = ({ navigation }) => ({
    headerLeft: <HeaderTitle icon="sun" color="orange" title="You.i Weather" />,
    headerTitle: null,
    headerRight: <HeaderButtons navigation={navigation} />,
  });

  componentDidMount() {
    const {
      props: { navigation, selectedCity },
      onRefresh,
    } = this;

    navigation.setParams({
      handleRefresh: onRefresh,
    });

    this.setState({
      selectedItem: selectedCity,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedCity !== this.props.selectedCity) {
      this.setState(
        {
          selectedItem: this.props.selectedCity,
        },
        () =>
          isNil(this.state.selectedItem) &&
          FocusManager.focus(this.buttonRef.current),
      );
    }
  }

  componentWillUnmount() {
    this.willBlurSubscription.remove();
  }

  onFocus = () => this.setState({ isButtonFocus: true });

  onBlur = () => this.setState({ isButtonFocus: false });

  onRefresh = () => {
    const {
      actions: { getWeatherByGroup },
      listOfCities,
    } = this.props;

    getWeatherByGroup(listOfCities);
  };

  goToAddView = () => {
    const { searching, navigation } = this.props;

    if (searching) {
      return;
    }

    navigation.navigate('AddLocation');
  };

  render() {
    const {
      props: {
        actions: { removeWeather, setActiveWeather },
        navigation,
        data,
        searching,
      },
      state: { selectedItem, isButtonFocus },
      viewRef,
      buttonRef,
      onFocus,
      onBlur,
      goToAddView,
    } = this;

    return (
      <View style={styles.container} ref={viewRef}>
        {isEmpty(data) ? (
          <Placeholder />
        ) : (
          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            horizontal={true}
            extraData={selectedItem}
            renderItem={({ item }) => (
              <CurrentWeather
                city={item}
                navigation={navigation}
                selected={selectedItem}
                onRemove={removeWeather}
                onSelect={setActiveWeather}
                isRefresh={searching}
              />
            )}
          />
        )}

        <AddButton
          ref={buttonRef}
          isFocus={isButtonFocus}
          onPress={goToAddView}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  headerButtonContainer: {
    flexDirection: 'row',
  },
});
