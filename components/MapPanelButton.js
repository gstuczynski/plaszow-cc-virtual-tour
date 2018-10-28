import React from 'react';
import { AppRegistry, StyleSheet, asset, Image, VrButton } from 'react-360';
import Entity from 'Entity';

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

class MapPanelButton extends React.Component {
  render() {
    console.log('close button props', this.props);
    return (
      <VrButton
        onClick={() => TourActions.displayMap()}>
        <Entity source={{obj: asset('3dmodels/earth.obj'), mtl: asset('3dmodels/earth.mtl')} } />
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

const MapPanelButtonWithStore = connectToStores(MapPanelButton, [TourStore], storeConnector);

AppRegistry.registerComponent('MapPanelButton', () => MapPanelButtonWithStore);
export default MapPanelButtonWithStore;
