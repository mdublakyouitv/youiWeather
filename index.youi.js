import { AppRegistry } from 'react-native';
import { FontRegistry } from '@youi/react-native-youi';

import App from './src/app';

FontRegistry.exists('FontAwesome').then(result => {
  if (!result.exists) {
    FontRegistry.add({
      family: 'FontAwesome',
      file: 'FontAwesome.ttf',
    });
  }
});

FontRegistry.exists('Feather').then(result => {
  if (!result.exists) {
    FontRegistry.add({ family: 'Feather', file: 'Feather.ttf' });
  }
});

FontRegistry.exists('MaterialCommunityIcons').then(result => {
  if (!result.exists) {
    FontRegistry.add({
      family: 'MaterialCommunityIcons',
      file: 'MaterialCommunityIcons.ttf',
    });
  }
});

AppRegistry.registerComponent('YiReactApp', () => App);
