import React from 'react';
import { AppRegistry, StyleSheet, asset, Image, VrButton } from 'react-360';

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
    console.log('close button props', this.props);
    return (
      <VrButton
        onClick={() => TourActions.hideInfoPanel()}
        style={{
          flexDirection: 'row',
          transform: [{ translateY: 0 }, { translateX: 1380 }],
        }}>
        <Image style={styles.image} source={asset('icons/close-button.png')} />
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
