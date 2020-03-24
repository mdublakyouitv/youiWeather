import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { FormFactor } from '@youi/react-native-youi';

import Splash from './screens/Splash/Container';
import Home from './screens/Home/Container';
import About from './screens/About/Main';
import AddLocation from './screens/AddLocation/Container';
import Forecast from './screens/Forecast/Container';

const AppNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    Forecast: { screen: Forecast },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        ...FormFactor.select({
          TV: { height: 50 },
          Tablet: { height: 30 },
          Handset: { height: 10 },
        }),
        backgroundColor: FormFactor.isTV ? '#0a84ff' : '#3DDC84',
      },
      headerLeftContainerStyle: {
        marginLeft: FormFactor.isTV ? 10 : 5,
      },
      headerRightContainerStyle: {
        marginRight: FormFactor.isTV ? 10 : 5,
      },
    },
  },
);

const RootStack = createStackNavigator(
  {
    Main: { screen: AppNavigator },
    About: { screen: About },
    AddLocation: { screen: AddLocation },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    cardStyle: {
      backgroundColor: 'transparent',
      opacity: 1,
    },
    initialRouteName: 'Main',
  },
);

export const InitializationNavigator = createSwitchNavigator(
  {
    Splash: {
      screen: Splash,
    },
    App: {
      screen: RootStack,
    },
  },
  {
    initialRouteName: 'Splash',
  },
);
