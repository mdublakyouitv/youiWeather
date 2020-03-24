import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

import { InitializationNavigator as NavigationContainer } from './NavigationContainer';

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer />
      </Provider>
    );
  }
}

export default App;
