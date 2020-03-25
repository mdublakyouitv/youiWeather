import React, { PureComponent } from 'react';
import { requireNativeComponent, findNodeHandle, UIManager } from 'react-native';

let _FocusZoneView = requireNativeComponent('FocusZoneView', FocusZoneView);

class FocusZoneView extends PureComponent {
  focusZoneViewRef = React.createRef();

  setRestoreFocus = ref => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.focusZoneViewRef.current),
      UIManager.getViewManagerConfig('FocusZoneView').Commands.setRestoreFocus,
      [findNodeHandle(ref)]
    );
  };

  render() {
    return <_FocusZoneView ref={this.focusZoneViewRef} {...this.props} />;
  }
}

export default FocusZoneView;
