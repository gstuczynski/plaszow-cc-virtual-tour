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

const storeConnector = {
  TourStore(Store) {
    return {
      displayInfoPanel: Store.displayInfoPanelStatus(),
    };
  },
};

class CloseButton extends React.Component {
  render() {
    return (
      <VrButton
        onClick={() => TourActions.hideInfoPanel()}
        style={!this.props.displayInfoPanel ? { display: 'none' } : { flexDirection: 'row' }}>
        <Image style={styles.image} source={asset('icons/close-button.png')} />
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
    height: 32,
    textAlign: 'center',
    backgroundColor: 'red',
  },
  image: {
    width: 32,
    height: 32,
  },
});

const CloseButtonWithStore = connectToStores(CloseButton, [TourStore], storeConnector);

AppRegistry.registerComponent('CloseButton', () => CloseButtonWithStore);
export default CloseButtonWithStore;
