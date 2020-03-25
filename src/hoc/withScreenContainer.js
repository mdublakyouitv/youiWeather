/**
 * © You i Labs Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PureComponent } from 'react';
import { findNodeHandle, NativeModules } from 'react-native';
import { FocusManager } from '@youi/react-native-youi';
import { NavigationEvents } from 'react-navigation';

import FocusZoneView from './FocusZoneView';

const { NodeUtility } = NativeModules;

function withScreenContainer(WrappedComponent) {
  class ComponentWithScreenContainer extends PureComponent {
    screenRef = React.createRef();

    state = {
      isFocused: true,
    };

    componentDidUpdate(_prevProps, prevState) {
      if (this.state.isFocused && !prevState.isFocused) {
        NodeUtility.show(findNodeHandle(this.screenRef.current));
        FocusManager.focus(this.screenRef.current);
      }
    }

    _onWillBlur = () => {
      NodeUtility.hide(findNodeHandle(this.screenRef.current));
      this.setState({ isFocused: false });
    };

    _onDidFocus = () => {
      this.setState({ isFocused: true });
    };

    render() {
      return (
        <FocusZoneView ref={this.screenRef} style={{ flex: 1 }}>
          <NavigationEvents onWillBlur={this._onWillBlur} onDidFocus={this._onDidFocus} />
          <WrappedComponent {...this.props} isFocused={this.state.isFocused} />
        </FocusZoneView>
      );
    }
  }

  return ComponentWithScreenContainer;
}

export default withScreenContainer;
