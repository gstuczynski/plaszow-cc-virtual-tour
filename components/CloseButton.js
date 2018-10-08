import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Environment,
  asset,
  Text,
  Image,
  Animated,
  VrButton,
} from 'react-360';

import connectToStores from '../connectToStores';
import TourStore from '../stores/tourStore';
import TourActions from '../actions/tourActions';

class CloseButton extends React.Component {
  render() {
    return (
      <VrButton style={styles.closeButton} onClick={() => TourActions.hideInfoPanel()}>
        <Text style={styles.buttonInfo}>Close</Text>
      </VrButton>
    );
  }
}

const styles = StyleSheet.create({
  closeButton: {
    backgroundColor: 'red',
    width: 80,
    height: 25,
  },
  buttonInfo: {
    padding: 10,
    textAlign: 'center',
  },
  image: {
    width: 32,
    height: 32,
  },
});

// const CloseButtonWithStore = connectToStores(
//     CloseButton, [TourStore], storeConnector
// );

AppRegistry.registerComponent('CloseButton', () => CloseButton);
export default CloseButton;
